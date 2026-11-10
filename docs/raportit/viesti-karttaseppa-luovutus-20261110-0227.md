# Karttaseppä: luovutus 10.11.2026 klo 02.27 (KS)
Syy: konteksti ≥ 26 % (hook), pehmeä raja. Korvaa -0201:n. Vanhemmat luovutukset historiaa.
`K=/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/katot-luuranko/`  `B=/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/b3-lontoo/`  (ei git-repoja)

## VALMIIT TÄSSÄ VUOROSSA
1. **Hetkien Pulu-kysymykset mainissa 5595fe7cf** (PR 6531, skeema 1.70): Pariisi 6 + Lontoo 5 hetkeä, 2 kysymystä/hetki (KK:n lista).
   nosto-kysymykset.mjs laskee hetket; 11 riviä pois poikkeuslistalta. PT kuittasi.
2. **Skandaali-/syvennyskysymykset mainissa ca7406df9** (PR 6532, skeema 1.71): Pariisi 5 + Lontoo 3 korttia (skandaalit.js,
   fokusvirta-pariisi/-lontoo täkyt). Natiivi lukee (NUI a970b0d1c). Työpuu ja haara poistettu. Valmis-rivi PT:lle lähetetty.
3. **Pulun valmiit vastaukset = maksullinen generointi → EI nyt** (PT 02.3x; KK:n aamulistalla). Kerroin PT:lle: NUI:n raportin
   mukaan pelaajalla ei live-generointia, joten ilman valmiita Pulu tarjoaa kaupungin/maan valmiit.
4. **Koe6 Mac-kuvat katsottu** (`$K/koe6-tulos.md`): Lontoo ok (ei rakoja). Pariisi: koe5:n kiilat poissa, räystäät säilyvät, MUTTA
   1 tumma rako jäljellä + uusi vaalea sauma lähikuvissa → ei paria PT:lle.
5. **Palapuolitus JU:lla (ajot 13–14)**: sarake 16597 koe3:n paloina = ei saumoja; sarake 16596 = ennallaan → KAIKKI saumat
   sarakkeessa 16597 (koe-alueen palat 11270–11272). Kuvat `$K/kuvat/a/pt/puolitus-koe3-koe6-k3x97-lahi{45,70}.png`.
   Raportoitu PT:lle 02.2x.

## TYÖN ALLA / JONO (järjestyksessä)
a. **Pariisin saumat** (PT: jatka; koe6 junaan vasta kun raot 0 ja räystäät säilyvät, PT:n pari). Seuraava askel `$K/koe6-tulos.md` lopussa:
   rivipuolitus 16597_11270/11271/11272 (kansiot kuten `$K/pariisi/palat-v23-katot-koe6-k3x97`, indeksi.txt korjataan
   `$K/profiloi/indeksi.py`-mallilla; skenaario `$K/sk-pariisi-k3x97.txt`-mallilla, vain lahi-45/70), pyyntö JU:lle (local_2a7d6c96…)
   + rivi `$K/ajopyynto-mac.md`:hen. Epäilty talo relation/546797 (42 m kameraan päin, pitkä sisäpihatalo). Pickle-mittarit
   (aukot, suikaleet, paadyt) EIVÄT erota sitä → sauma syntyy muualla kuin mitatuissa piirteissä (ehkä palan .bytes-muunnos tai tayte).
   Talotasolla: koe6 ilman yksinkertaistusta yhdeltä talolta → Mac-pari. Apuvälineet `$K/profiloi/`: zoom.py, erot.py, lahella.py.
b. Pelikuvat (-0135 kohta a): Vrain-Lucas ≥ 600 px haku, Lontoon 02-a ja 07-b pelinäkymässä katsomatta. Korjattu lista PT:n kautta KK:lle.
c. Sisäkulmien rypyt (13 %) vasta saumojen jälkeen, jos tarvitaan.
d. Nimiäänet Lontoolle vasta Pariisin oton jälkeen (KK 01.0x); nimilista 43 (sijainnit.json lontoo:*).

## Tiedoksi
- PK 02.4x (PT:n luvalla): TaloKerros.Paivita vapauttaa talot juoksupelin ajaksi (KartanMuisti.Vapautettu), commit 544dd537c
  natiivi-backup pelikoodari/juoksu-talot-pois. Ei toimia KS:lle.
- Faktat-työpuu /Users/Shared/Claude/wt/karttaseppa-faktat poistettu; hetket-työpuu poistettu.

## Vahdit (viritä uudelleen)
- Postilaatikko: Monitor `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh` (30 min, re-arm).
- Omia ajoja ei käynnissä.
