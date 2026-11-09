# Karttaseppä: luovutus 10.11.2026 klo 00.10 (KS)
Syy: konteksti yli 25 % (hook), pehmeä raja. Korvaa -2301:n. Vanhemmat luovutukset historiaa.
`K=/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/katot-luuranko/`  (ei git-repo; skriptit `$K/skriptit/`)

## VALMIIT TÄSSÄ VUOROSSA (kaupungit koodilla, osa A = katot; koe, EI junaan)
1. **Palakoko (kohta b) = koe2.** Pariisin koepalat 5× → 1,3–2,0× nykyisestä (7 palaa 45 → 24 Mt), Lontoo 1,1–1,2×. Katto- ja päätyala tavulleen sama kuin koe1, kierto testattu, lisäpala tavulleen sama. Selvitys `$K/palakoko-koe2.md`. JU ajoi koe2-kuvat (23.34/23.40): ulkoasu = koe1 (erot vain maan sävyssä, ero-kuva `$K/kuvat/a/ero-koe1-koe2-pariisi-iphone-45.png`).
   - katot.py: konveksit() (pohja konvekseiksi paloiksi), verkko() (jaetut kärjet ryhmittäin, _yhdista ryhmän palaset yhdeksi monikulmioksi, ylin vaakaviipale yksi ryhmä per talo, päätyketjut), Paatyhaku (piilossa olevat päädyt pois: naapurin pääty samalla viivalla ≤ 5 cm ja vähintään yhtä korkea).
   - tee-palat-*-luuranko.py: esikierros (KERAA, KVALMIS, KPH) ennen piirtoa; mittareihin k_katto, k_paaty, paatyja_piilossa; `UL.kattokarjet.json` talokohtaisesti; seuraava ajo kirjoittaa myös `UL.katot.pickle` (osm → kolmiot, päädyt, muoto) rypistymien selvitykseen.
   - Varmuuskopiot: `katot-koe1.py`, `katot-koe2.py`, `tee-palat-*-luuranko-koe1.py`.
   - Ajot: `$K/aja-{pariisi,lontoo}-vaihe3-koe2.zsh` (LISAPALA kuten ennen).
2. **Kuvat (kohta a) katsottu**: parit `$K/kuvat/a/` (pari-*, r45-kaari, r85, rajaus-*; PT:lle valitut `pt/`), arvio `$K/kuvat/a/havainnot.md`. PT:lle lähetetty 23.4x. Pariisin mansardi yhtenäinen kadunvarsilla, Lontoon aumat ehjät; viat: ohuita vaaleita viiltoja ja sisäpihojen kulmissa rypistymiä, ei piikkejä.
3. PT 23.5x: viillot ja rypistymät korjataan osa A:ssa ennen osaa B, samat rajaukset, parit PT:lle. Palakoon loput 2× = tekninen valinta (PT:lle kerrottu): teen itse kuvien jälkeen (lyhyiden reunojen < 2 m ala- ja ylärinne yhdeksi tasoksi), omistajalle vain jos koko jää selvästi yli nykyisen.

## TYÖN ALLA / JONO (järjestyksessä)
0. **KIIREELLINEN ENSIN (PT 10.11. 00.2x, ennen aamua; ennen B3:a):** NUI:n Mac-ajossa 934ea6ca9 Lontoon pallonäkymässä valkoiset talolaatikot ja harmaat laattaaukot (`/Users/Shared/Claude/proto-3d/lokit/nui-pallonapit-3-iphone-vaaka-934ea6ca9/a1-lontoo-heti.png`, a5). Selvitä: taantuma talot-palvelimelta-muutoksesta (KS 94b11251a / NS b2273c132) vai Mac-esikatselun talot-kansio-jäämä (Macissa talot vaativat talot kansio -rivin). Sama Mac-reitti b804a87d6:lla JU:n vuorolla → pari PT:lle. Asennuslinkissä 1a6bdd8fa (sama talokoodi).
   Alkuhavainto (KS 00.2x): kuva on pallon ilmakuvanäkymä (ilmakuvalaatat + valkoiset suulakepuristetut talot), ei piirroskaupungin palat. unity.logissa `talot lataus: luettelo lontoo v1, 242 palaa` mutta `levyllä 219 palaa` (= Pariisin palat samassa `.../Matkakirja 3D esikatselu 2/talot`-kansiossa), Lontoolle ei riviä "kokonaan levyllä". Lisäksi esilataaja hakee `talo-<sha>.gz`-ryhmiä (Saapuminen). Tarkista, mikä piirtää valkoiset laatikot pallonäkymässä ja tuleeko Lontoon talot ämpäristä vai puuttuvatko ne levyltä.
a. **Viillot (T-liitokset).** `katot._tliitokset` kirjoitettu (toisen pinnan kärki kolmion reunalla ≤ 2 mm → kolmio jaetaan, kärjestä kolmion oma kopio, uv lineaarisesti). Synteettiset testit OK (ala ja kierto). MUTTA Pariisin vaihe 3 jumittui > 30 min ensimmäiseen palaan → kytkin `katot.TLIITOKSET = False` (pois päältä). Profiloi ensin (cProfile yhdelle talolle `UL.katot.pickle`sta tai suoraan verkko()-kutsusta); epäily: jono-silmukka jakaa saman kolmion yhä uudelleen (vahti 200 000 / talo) tai ehdokashaku. Sitten koe3: `$K/aja-{pariisi,lontoo}-vaihe3-koe3.zsh` (kansiot palat-*-koe3 = koe1-kopio, valmiina), skenaariot `$K/sk-{pariisi,lontoo}-koe3.txt` valmiina → ajopyyntö JU:lle (lisää `ajopyynto-mac.md`:hen kuten koe2-LISÄYS).
   Vaihtoehto, jos viillot eivät ole T-liitoksia: alle 1 cm:n leikkausjäämät (konveksit-leikkaus) tai katon ja päädyn väli → tarkista lähikuvasta.
b. **Rypistymät sisäpihojen kulmissa**: aja ensin koe2/koe3 kerran pickle-dumpin kanssa, etsi talot, joilla eniten < 0,5 m²:n pintoja / eri normaaleja, piirrä ylhäältä varjostettuna (PIL) ja päätä: pienet kasvot naapuriin, sisärenkaan (reiän) reunoille ei laajennusta, tai varakatto.
c. Palakoko loppuun (yllä kohta 3), mittaa samalla taulukolla kuin palakoko-koe2.md.
d. Uudet kuvat samalla rajauksella → parit PT:lle (≤ 1000 px) + 3 riviä.
e. **PT 10.11. 00.0x: Kaupungit B3** rinnalle: Lontoon nostojen ja esittelyjen data samaan muotoon kuin Pariisin (paikat, kysymykset 2.218, kuvat olemassa olevista lähteistä), EI generointia (tekstit/äänet/kuvat → määrälista PT:lle aamun korttia varten). Tarkista ensin muiden haarat (onko jo tehty) → jos on, sha ja polku PT:lle. Ei aloitettu.

## Vahdit (viritä uudelleen)
- Postilaatikko: Monitor `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh` (30 min, re-arm).
- Omia ajoja ei käynnissä (koe3-ajot pysäytetty omilla pid:illä). JU:lta ei odoteta mitään.
- Työlista: "Kaupungit koodilla: Pariisi ja Lontoo loppuun" tilanne päivitetty 23.5x.
