#!/usr/bin/env python3
"""Merkitsee iOS-laitteen arm64-staattiset kirjastot iOS-simulaattorin kirjastoiksi.

Cesium for Unity toimittaa iOS:lle vain laitekirjastot (LC_BUILD_VERSION platform 2).
Apple silicon -simulaattori ajaa samaa arm64-konekoodia, mutta linkkeri hyväksyy
vain platform 7 (IOSSIMULATOR). Tämä vaihtaa kentän paikallaan jokaisessa
arkiston jäsenessä. Koot eivät muutu, joten arkisto ja sen symbolitaulu pysyvät
ehjinä. Käytetään VAIN simulaattorikäännöksen kopioon (Build/iOS-sim), ei
pakettiin eikä laitekäännökseen.

Käyttö: simulaattorimerkinta.py <kansio-tai-.a> ...
"""
import os
import struct
import sys

MH_MAGIC_64 = 0xFEEDFACF
LC_BUILD_VERSION = 0x32
LAITE, SIMULAATTORI = 2, 7


def merkitse_macho(data, alku):
    """Palauttaa muutettujen komentojen määrän yhdessä Mach-O-objektissa."""
    if struct.unpack_from("<I", data, alku)[0] != MH_MAGIC_64:
        return 0
    ncmds = struct.unpack_from("<I", data, alku + 16)[0]
    kohta = alku + 32
    muutettu = 0
    for _ in range(ncmds):
        cmd, koko = struct.unpack_from("<II", data, kohta)
        if cmd == LC_BUILD_VERSION:
            alusta = struct.unpack_from("<I", data, kohta + 8)[0]
            if alusta == LAITE:
                struct.pack_into("<I", data, kohta + 8, SIMULAATTORI)
                muutettu += 1
        kohta += koko
    return muutettu


def merkitse_arkisto(polku):
    data = bytearray(open(polku, "rb").read())
    if data[:8] != b"!<arch>\n":
        raise SystemExit(f"ei ar-arkisto: {polku}")
    kohta, muutettu, jasenia = 8, 0, 0
    while kohta + 60 <= len(data):
        otsake = data[kohta:kohta + 60]
        nimi = otsake[:16].decode("ascii", "replace").strip()
        koko = int(otsake[48:58].decode().strip())
        runko = kohta + 60
        if nimi.startswith("#1/"):  # BSD: pitkä nimi rungon alussa
            runko += int(nimi[3:])
        muutettu += merkitse_macho(data, runko)
        jasenia += 1
        kohta += 60 + koko + (koko & 1)
    open(polku, "wb").write(data)
    return muutettu, jasenia


def main():
    yhteensa = 0
    for arg in sys.argv[1:]:
        tiedostot = [arg] if arg.endswith(".a") else [
            os.path.join(juuri, t) for juuri, _, ts in os.walk(arg) for t in ts if t.endswith(".a")]
        for t in tiedostot:
            muutettu, jasenia = merkitse_arkisto(t)
            yhteensa += muutettu
    print(f"simulaattorimerkintä: {yhteensa} objektia merkitty")


if __name__ == "__main__":
    main()
