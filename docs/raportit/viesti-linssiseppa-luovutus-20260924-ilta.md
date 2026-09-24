# Linssisepän luovutus 24.9.2026 klo 19.03

*Linssiseppä (Opus). Kirjoitettu Fablen käskystä nollausta varten. Edellinen luovutus on
viesti-linssiseppa-luovutus-20260924-1216.md. Jatkaja lukee tämän ja aloitusviestin
viesti-linssiseppa-aloitus.md.*

## Tila lyhyesti

Natiivin master on 186c37b tai uudempi. Kaikki tämän päivän linssierät on mergetty. Build 10 on viety
(Julkaisija), ja build 11:n ja 12:n jono on alla.

**Testilaite on iso iPad** "iPad Pro 13 (Sami)", UDID 00008103-001819421413401E, 1024×1366 pt, App ID
`fi.matkakirja.peli.kehitys` (tiimi RCD77XPB7M). Laite on jaettu Laitetestaajan kanssa: ilmoita hänelle, kun otat
laitteen ja kun vapautat sen. Pieni iPad (00008142…) on omistajan. `Linssit-testit/laitetesti.sh` ja
`tyokalut/ipad.sh` käyttävät isoa iPadia oletuksena. Webin kuvat otetaan `PW_W=1024 PW_H=1366`.

## Tehty tänään (mergetty)

| Asia | Haara/SHA | Todiste |
|---|---|---|
| VU-mittari: raaka RMS, PreEffects-tappi, välitila varakuvio (live-Icecast ei anna tapille ääntä → AVAudioEngine build 8, Natiiviseppä) | vu-kuvat, vu-rms, vu-syy | proto-3d/lokit/linssit-vu-20260924/ |
| Piikkiajot 7–8: ihmisen matkan vanat seuraavaan kehykseen (31,7 → alle 20 ms); sulkuäänen 50 ms → Natiivi-UI esilataa | piikit7 | lokit/linssit-piikit-20260924/RAPORTTI.md |
| ISS-rata päivittyy joka kehys (löydös 33) | b10-avaruus b13adaa | lokit/linssit-iss-20260924/iss.mp4 |
| Astronautin pulu kuten webissä: pillerit oikeaan chattiin, konteksti ilman sijaintia ja avoin kuva (löydös 35) | astropulu 1b2236e | lokit/linssit-astropulu-20260924/b10d-sallittu/ (worker #3096 sallii kehitys-ID:n) |
| Keksintöjen lamput: tarkka sRGB-sekoitus tummalla pohjalla ja saman kaupungin pinot yhtenä neliönä | b10-keksinnot 0d6d8f2, lamppupinot 79afd84 | lokit/linssit-keksinnot-pari-20260924/pari-1796-web-vs-b10f.jpg (huiput = web) |
| Linssinimet keksinnöissä (Natiivisepän kerros e8d95dd, webin laattanimien mitat) | linssinimet f4a5a6d | sama kuvapari |
| Testityökalut: iss-, keksinnotpari- ja astropulu-tila; kontakti-web PW_W/PW_H ja KIINTEA=keksinnotpari | iso-ipad 5005664, 29dd7fa | – |
| Web: vertailulinssi pallolla Natural Earth 10m:stä (Huippuvuoret Norjalle, Finnmarkin kolmiot pois) | web-PR #3078 (Julkaisija) | lokit/linssit-huippuvuoret-20260924/web, web-jalkeen |

## Avoinna

1. **Radiolinssin uudistus** (omistajan päätös, Raamattu "RADIOLINSSIN UUDISTUS NATIIVISSA"): kuvitettu suunnitelma
   Fablelle hyväksyttäväksi. Siihen tulevat paneelin asettelu kuvaputken tekstuureilla, VU ja LCD samalle riville,
   hämärän kartan sävy, 3D-radiomastot kolmessa koossa punaisella vilkulla (valittu vilkkuu VU:n tahdissa ja valaisee
   ympäristöä), radioaaltorenkaat, rahina etäisyyden mukaan, kamera-ajo asemaa vaihdettaessa ja animaatioiden kestot
   sekunteina. Toteutus build 12. Lähtötiedot: Linssit/Ydin/Radio (RadioLinssi, VuMittari), UI/Linssit/RadioNakyma
   (Natiivi-UI), web js/linssit/radio.js ja radiosoitin.js.
2. **Löydös 43** (omistaja, build 11): radiolinssissä kaikki maat näkyvät ilman huntua, kuten webissä, jossa koko
   kartta on normaali. Natiivissa muut maat ovat nyt harmaina. Tarkista samalla muut linssit linssikohtaisesti webin
   mukaan.
3. **Radiolöydökset 39/40/42** ovat Natiivi-UI:lla (natiivi-ui/radio-loydokset 22d04c9, kuvaparit tulossa). Löydös
   41 (näyttöteksti) on sama kuin webissä, joten se ei vaadi muutosta.
4. **Merinimet**: Siirtosepän skeema 1.36 (luonnos-PR #3099, #3081:n päällä), kokoelmat/merinimet.json 29 nimeä.
   Natiiviseppä piirtää ne linssinimiin. Tarkista keksintöjen kuvaparista build 11:ssä. Nostonimet linssikartalla
   tarvitsevat vielä Natiivi-UI:n ehdon.
5. **Huippuvuoret natiivissa**: tulevat, kun skeema 1.34 (#3081) ja #3078 ovat tuotannossa. Tarkista
   `laitetesti.sh huippuvuoret`.
6. **Taidemuseo- ja esitysmoottorisuunnitelma** (docs/raportit/linssi-taidemuseo-suunnitelma-20260924.md,
   hyväksytty): erä 1 on toimitettu, eli 30 maalausta (Met CC0 22 ja NGA PD 8), luku 4.0. Erä 2 on tilattu: Rooman
   osa, Mona Lisa ja käsikirjoituksen neljä teosta (NGA 26, 12131, 46136, 46137, 41690, 356, 1177, 24, 41671, 1138
   ja 41). Uffizin ja Accademian erä on peruttu. Taiteilijoiden muotokuvia on Fablen mukaan 16/18 ilman
   sijaiskasvoja. Veistokset ja kartat tulevat erikseen. Toteutus vasta, kun Fable käskee.
7. **Levy**: omistajalle skripti `zsh /Users/Shared/Claude/proto-3d/vapauta-levy-linssiseppa-20260924.sh aja`.
   Se poistaa 3,4 Gt kopioita ja pienentää 336 raakakuvaa. Ilman aja-sanaa se näyttää vain koot. Pysyviä poistoja ei
   tehdä itse.
8. **Maapallon tila -linssi**: suunnitelma on valmis. Toteutus vasta pariteetin jälkeen.

## Opit

- **WEB ON MALLI, MITATTUNA**: web-kuva samasta tilasta, mitat koodista ja kuvapari merge-pyyntöön. Webin
  `ui.aikajana.siirry()` ei aloita selausta, natiivin `Ajo.Siirry` aloittaa, joten kutsu webissä ensin
  `aloitaSelaus()`.
- **Webin linssikartan nimet ovat laatoissa**, eivät elävinä nimiöinä: web piilottaa elävät nimiöt linssin ajaksi.
- **Lineaarinen kehys vs webin sRGB**: tummalla pohjalla c' = lin(c + (1−a)·B) − (1−a)·lin(B), B = 43/255.
  Päällekkäiset lamput kasataan yhdessä neliössä: a_k = 1 − (1 − a)^k.
- **iPadin videota ei saa ffmpegillä** (avfoundation ei näe laitetta). Käytä komento.txt-sarjaa
  `kuva …; odota 0.25` ja kokoa ffmpegillä. CaptureScreenshot venyttää kehyksen noin 300 ms:iin, joten kehysajat
  eivät kelpaa samasta ajosta.
- **Pulun chat**: pöllökoodi (Keychain) ohittaa vain päivärajan. Uusi App ID pitää lisätä workerin sallittuihin.
- **Viestien raja**: vertaisviestejä voi lähettää 10 ilman käyttäjän kirjoitusta. Niputa viestit.
