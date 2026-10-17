# Linnanrakentajan luovutus 18.10.2026 klo 00.40 (Opus) – omistajan tilinvaihto 00.34, PT: ei uusia töitä

Edellinen luovutus: `viesti-linnanrakentaja-luovutus-20261017-ilta.md` (131170f8e). Viestit lähetetään AINA session id:llä
(`/Users/Shared/Claude/osoitekirja.md`). PT:lle enintään 3 riviä, ja polut ovat absoluuttisia.

## 1. SEURAAVAKSI

1. **LOUVREN KEHYKSET (juna 201, PT 00.44; omistajan kuva 23.07 "tasainen ruskea laatikko"):**
   - **Kuva:** `/Users/Shared/Claude/Matkakirja-fable/docs/raportit/kaappaukset/omistaja-20261017/louvre-monalisa-napautus-2307.png`.
   - **Proto:** `linnanrakentaja/louvre-kehykset-201` **3aeac4c8d** (21d5712be:n päällä). Worktree on
     `/Users/Shared/Claude/wt/proto-linnanrakentaja-kehykset`. Museo-testit 164/164, tarkista.sh 0.
   - **Mitä muuttui:**
     - Ranskan salin `fr_monalisa`-profiili: 24 pistettä (ulkohelmi, friisi, köysitorus ja sisähelmi), ja se on kytketty se-monalisaan.
     - Ranskan salin kultakehyksillä on veistospinta `Resources/Museo/pinnat/kehys-kultaveisto.png`. Lähde: Minneapolis Institute of
       Art, Frame, Venetian 88.5.3, PD. Tekstuuri on tehty työkalulla `tyokalut/tee_kultaveisto.py`.
     - Veistospinta kulkee profiilin poikki: KehysOsat `profiiliVariin` → kärkiväri R.
     - Varjostimessa on uusi `_PintaTapa 3` ja kohouma `_VeistoSyvyys` 4 mm.
     - Louvren kulta 178/150/98 × valo 1,35. Muut salit pysyvät ennallaan (`LouvrenKehykset` = Uusi && Maa == "ranska").
   - **KESKEN:** simu on ajamatta. JU kirjasi sen luovutuksensa kohtaan 0 (1f3902367), joten JU:n seuraaja kääntää ja ajaa iPhonella
     pystyasennossa.
     - Skenaario: `/Users/Shared/Claude/proto-3d/tyokalut/linnanrakentaja-ajot/sk-louvre-kehykset-201.txt`.
     - Kuvat: k1 Mona Lisa uusi, k2 ilman veistoa (`museo pinnat 0`), k3 Kaanaan häät.
     - Tarkista varjostinvirheet lokista, koska varjostimen uusi haara on vielä testaamatta Unityssä.
     - Tarkista kuvat täysikokoisina esine kerrallaan:
       - Kulta ei saa olla oranssi eikä ruskea.
       - Veistos saa olla korkeintaan hento, ei kohinaa.
       - Kehyksen sisäreunalla ei saa näkyä tummaa juovaa.
     - Säädettävät: `MuseoRakennus.LouvreKultaValo`, `VeistoVoima`, `VeistoSyvyysM` ja `VeistoJaksoKerroin`.
     - Kun kuvat ovat kunnossa: arkki (otsikot, commit + käännös) → PT → KK → NS.
   - **LS rinnakkain:** `linssiseppa/monalisa-201` (liike + zoom) muuttaa vain MuseoKierros*, MuseoSovitin.cs ja testit, ei samoja
     tiedostoja kuin 3aeac4c8d (tarkistettu 00.45), joten ne yhdistyvät ilman ristiriitaa. Pyramidi v2.4 ffa433c76: PT vie KK:lle.
   - **Mallikuva oikeasta kehyksestä:** Commons "Mona Lisa Louvre 12 2016 1174.jpg" (CC BY-SA 4.0). Kehys on tumma antiikkikulta,
     jossa on helminauha, soikiokartussit ja köysi.
2. **KARTAN 3D-YHTENÄISTYS (arkki 5):**
   - **Tila:**
     - Galleria-200: PK 294d24f62. Pallon varjo on vaalea ja pieni (peitto 0,2, leveys 0,6 × pallo) ja piiloutuu nappulan varjon päällä.
       PK perui oman pyramidimuutoksensa.
     - Pyramidi on **LS:n** (juna 201, kontaktivarjo): ffa433c76 `linssiseppa/orsay-valinnaiset-200`. Sarjavarjo on 1,05/0,3,
       reuna ≤ 1 px ja peitto 0,5, ja reunus on 1,06 × sivu (okra).
     - LS ajoi oman simunsa noin klo 00.42 → PT.
   - **SEURAAVA:** kun PT on kuitannut LS:n pyramidin, kerro sen lopullinen sha PK:lle. PK yhdistää sen galleria-200:aan, ja JU ajaa
     `pelikoodari-ajot/sk-galleria-arkki4b.txt` (galleria + Pohjois- ja Etelä-Ranska + y3d).
   - **Arkki PT:lle:**
     - Jokaisessa paneelissa otsikko (tila + commit + käännös).
     - **Tarkista jokainen esine erikseen lähikuvasta**: pyramidin ja nappulan varjot, pallon varjo ei tuplana.
   - **Kirjanpito:** `/Users/Shared/Claude/proto-3d/_valmiit/kartan-pienoismallit-v1/ARKKI-1-HAVAINNOT.md` (arkit 1–4b ja opit) ja
     SUUNNITELMA.md (omistajan 22.27 terävä pieni varjo).
   - **A-polun mallit:** MSM, Carcassonne ja muut A-polun mallit ovat pelissä pois omistajan 29.9. päätöksellä (Symbolimallit.Paalla).
     Yhtenäistys näkyy kartalla vain palloissa, pyramidissa, nappulassa ja kipsipäissä.
   - **Hyväksynnän jälkeen:** luku "Kartan pienoismallit" 3D-maamerkki-pohjaan (LR) → NS kokoaa junaan.
3. **Tivolin Codex v2 (omistaja 22.15, TASAN 3: t1 ilta järveltä, t2 päivä, t3 Nimb):**
   - Tilaus 9f0efea5f (PT).
   - Kun toimitus tulee (`git ls-tree -r --name-only origin/claude/postilaatikko | grep tivoli-aidot`), arvioi **AITOUS edellä**
     rinnakkain pohjakuvan kanssa → PT.
   - Muistissa opetus `nykypaikan-kuva-aito-valokuva`.

## 2. TEHTY 17.10. 20.15 – 18.10. 00.40

- **Louvre v6k26:**
  - yoValo 40 → 26 (VS k83).
  - Paketti `_valmiit/omat-mallit-vienti-20261017-v6k26` (vain mallit.json muuttui), R2 20.30 (JU), junan 200 lukitusehto.
  - Skripti `_tyo/linnanrakentaja/louvre/rakenna-v6k26.py`.
- **Tivolin iltakuva (omistaja 22.17 "Kyllä, pagodi ja järvi"):**
  - Leif Jørgensen, Det japanske tårn 02, CC BY-SA 4.0 → kuvakortin 1. kuva.
  - Paketti h `_valmiit/koopenhamina-tivoli-kuvat-vienti-20261017h` (opas/pallokierros-v13), R2 22.21 (tarkistettu).
  - Natiivi proto `linnanrakentaja/tivoli-ilta-201` **adee63344** (Pallokierros.cs → v13 + testi + kultainen, 14/14) NS:lle junaan 201.
  - Worktree `wt/proto-linnanrakentaja-tivoli-ilta` (poista, kun NS on ottanut haaran).
- **Codexin Tivoli A+C hylätty (omistaja 22.13 "Ei näytä aidoille").** Arvio `_tyo/linnanrakentaja/tivoli/ARVIO-codex-A-C-20261017.md`.
- **Codexin Louvren pyramidiehdokkaat:** 9 kuvaa, yksikään ei käyttökelpoinen. Vastaus postissa 4fb54f128, ja tilaus on suljettu.
- **Worktreet:** `wt/linnanrakentaja-vapaa-lento-osio` (haara 91ba4c754 originissa) ja tyhjä `wt/linnanrakentaja-posti` poistettu.
- **Kartan yhtenäistys, arkit 1–4b:**
  - Kokosääntö on näkyvä massa (√pinta-ala).
  - Nimet ovat alla.
  - Varjo on terävä ja pieni (omistaja 22.27).
  - Yksi valon suunta (PK f23550247).
  - Taivaalla leijuvat B-napit on piilotettu.

## Opit

- **Viestit ristiin:** viestit menivät ristiin PK:n kanssa kolmesti (korjaus ehti perille vasta toteutuksen jälkeen). Kun jono on liikkeellä,
  ÄLÄ lähetä uutta korjausviestiä. Odota PK:n sha ja korjaa vasta seuraavassa.
- **Arkin tarkistus (PT palautti 4b:n):** tarkista jokainen esine lähikuvasta, ei kokonaiskuvasta. Laita otsikot myös lähikuviin.
- **zsh + git:** `"$C:refs/..."` laajenee `:r`-modifieriksi. Kirjoita sha kirjaimellisesti tai `"${C}:refs/..."`.
- **Commonsin UA:** vain `MatkakirjaBot/1.0 (https://github.com/ravelius/Matkakirja)`, ei sähköpostia (unohtui kerran 22.14).
- **numpy:** numpy ei näy `python3 -I`:llä (käyttäjän site-packages). Aja skripti omasta kansiostaan `python3 -P`:llä, ladattu data eri kansiossa.
