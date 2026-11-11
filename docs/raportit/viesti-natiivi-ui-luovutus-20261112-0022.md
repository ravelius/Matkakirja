# Natiivi-UI: luovutus 12.11.2026 klo 00.22 (kontekstivahti 28 %; jatkaa -2252:ta ce88cc33b/c255f7620)

PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31, JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd, KK local_d5f31591-21fa-4cb0-bab3-bcd3435d075a,
Postivahti local_1f31f830-9df5-41c1-8992-172e100af57f, SK local_b9ca71c7-3458-4e1d-aa21-f6c97e27c708.
Skenaariot: /Users/Shared/Claude/proto-3d/_tyo/natiivi-ui/sk-*.txt; ajot lokit/nui-*; tarkistus `sh Peli-testit/unity-tarkistus.sh </dev/null`.
KK 22.54: ESITTELYN 3D-TÄHTEÄ EI PIILOTETA (-2252:n kohta B peruttu kokonaan).

## WORKTREET (PT 00.0x: 8 valmista poistettu, levy 140 Gi vapaana)
- /Users/Shared/Claude/wt/nui-pariisi (proto-repo, natiivi-ui/pariisi-tekstit = 42e9c0559): PARIISIN TEKSTIVERSIO (koodi).
- /Users/Shared/Claude/wt/nui-pariisi-data (pää-repo, natiivi-ui/pariisi-isoisan-kuva = 1c9c522cb, origin): DATA.
- /Users/Shared/Claude/wt/nui-aarre (natiivi-ui/aarrekysymys = 9a8ca8d1a), nui-vakio (210c842ad), proto-nui-pallo (natiivi-ui/intro-nimet, vanha pulun haara),
  nui-luovutus-2115 (tämä). Proto-repon worktree poistetaan: `git -C /Users/Shared/Claude/proto-3d/Matkakirja-proto worktree remove <polku>`.

## TEHTY 22.55–00.22
1. aarrekysymys-1 (79f883671) KATSOTTU: kysymys, oikein-merkki, zoomaus, traileri, paluu ok. Löydökset:
   b3 noppa jäi rastin jälkeen (MatkaPerilla(null) ei häivytä: UiNakymat A11) → KORJATTU 9a8ca8d1a (PeliNakymat.AarreRastiNoppaPois).
   b5 esittely liian aikaisin ("mallilla Eiffel-torni ei kohdenostoa": kohdenostot latautuvat vasta zoomauksessa) ja c2/c3 rasti ilman
   oleta-odotusta + heita ei käy rastin jälkeen (vaihe Toiminta) → skenaario sk-aarrekysymys-2.txt (oleta kohdenostot, oleta rasti, ui liiku).
   aarrekysymys-2 JU:n jonossa (lokit/nui-aarrekysymys-2-9a8ca8d1a). KATSO: b3/c2 ei noppaa, b5 Eiffelin esittely, c3 Liiku auki → KK. Junaan vasta KK + PT pt-ok.
2. vakioajo 210c842ad KATSOTTU: 11/11 Pariisin 3D-kohdetta, pelin puolella 0 PUUTE (12 PUUTE = JU:n oleta-regex). Louvren nimi ~kortteli pohjoiseen (k04) → PT:lle
   pienenä. JU ajaa uudelleen (Lontoo + vakiokuvat puuttuvat) → katso PUUTE-rivit.
3. petit-palais-juna-1 (224.89) KATSOTTU: merkkejä 26, PP esitellään → KK:lle 00.0x. VALMIS.
4. taitto-juna-1b (224.88 72dcd6811) KATSOTTU: isoisän kortti taitettuna julkaistulla datalla → KK:lle t1/t2/t3/t5. VALMIS.
5. PARIISIN TEKSTIVERSIO (PT 00.1x, suunnitelma KK:n scratchpad/keskustelukanava/suunnitelmat/20261111-pariisin-tekstit-lopulliset.md):
   - Natiivin aineisto tulee VAIN julkaistusta sisällöstä (kokoelmat/fokusvirrat.json + luennat.json, media.matkakirja.app sisalto/1/uusin.json).
     Isoisän sivukuva = matkakirja.luentakuva (Saapumisesitys.cs:380, SivukuvaKaupungeissa "pariisi"); isoisän ääni = luennat-kokoelma (matkakirja.aanite);
     pulun ääni KOVAKOODATTU Saapumisesitys.cs KommenttiAanet pariisi = pulu-pariisi-3.mp3, soi vain jos tekstin tiiviste = b67b8821.
     KaupunkiIntro.cs:261 william-pariisi v2 = aloitusintron Williamin nimirivi, EI isoisä (v3:ssa ei ole williamia, 404) → oikein, ei muuteta.
   - DATA 1c9c522cb (SK:n paikallinen 3ddd79751 päällä, pushattu origin natiivi-ui/pariisi-isoisan-kuva): luentakuva = kuvat/kaupunki-intro-v3/isoisa-pariisi.png
     (JU vei mediaan), luentakuva2 (i2) pois; testit luentakuva + horatio-batches päivitetty (105/148 kuvaa); web 5704 pass 0 fail.
     Kuvatekstit (lyhyt/selite) MINUN EHDOTUS → KK:lle 00.2x kysytty, ODOTTAA vastausta (muutos → päivitä 1c9c522cb:n päälle).
   - KOODI 42e9c0559 = juna-224 8459237ec + cherry-pick ee723bf13 34b828931 8ad8431b8 ab6949202 (pulun ääni, otto 3, pyöreä rajaus, ui fokusvirrat juuri).
     unity-tarkistus 0. (Muut intro-nimet-commitit ovat jo junassa 37ca27dbd:nä.)
   - Vienti levyllä: _tyo/natiivi-ui/vienti-pariisi-tekstit (node tools/vienti/vie-sisalto.mjs --ulos …, data-worktreestä).
   - Mac-ajo sk-pariisi-tekstit-1.txt JU:n jonossa → lokit/nui-pariisi-tekstit-1-42e9c0559. Kehittäjän juuri vaihtaa vain fokusvirrat → isoisän v3-ääni
     EI soi tässä ajossa (luennat vanha). KATSO t1–t3 uusi teksti + kirjekyyhkykuva, k1 vain uusi pulun kommentti, p1–p3 Ballon Generali pyöreänä,
     lokista pulun äänen soitto (tiiviste). Kuvat täysikokoisina KK:lle (JU lähettää; katso itse myös).
   - AVOIN: pulun kuvan lisenssirivi "Aero4, Wikimedia Commons (CC BY-SA 4.0)" on datassa (lahde); en varmistanut, näkyykö se natiivissa (kuvan suurennos?).
     SK pyysi näkyviin → tarkista Mac-ajosta tai lisää ajoon pulun kuvan napautus.
   - JULKAISU: SK-haara + 1c9c522cb mainiin ja sisällön vienti (PT/JU) + koodi 42e9c0559 junaan KK:n sanalla + PT pt-ok.

## SEURAAVA
A. pariisi-tekstit-1 tulokset → katso → KK (ja kuvatekstien vastaus KK:lta).
B. aarrekysymys-2 tulokset → KK.
C. vakioajon uusinta → PUUTE-rivit.

## LISÄYS 00.3x
- KK 00.22 kuvatekstit: lyhyt hyväksytty; selite KK:n sanoin 2 virkettä (testi vaatii 2 lausetta → "Nyt paikalla on puisto." pois), Liébert lähdetietoihin
  → cb990dca6 (origin natiivi-ui/pariisi-isoisan-kuva), vienti-pariisi-tekstit päivitetty. KK:lle kerrottu.
- aarrekysymys-2 KATSOTTU: b3/c2 ei noppaa, b5 Eiffelin esittely auki, c3 Liiku auki → KK:lle 00.3x. ODOTTAA KK:n junasanaa + PT pt-ok
  (haara natiivi-backup natiivi-ui/aarrekysymys 9a8ca8d1a). Pieni: c3:ssa nappula ei näy Liiku-valinnan aikana (KK:lle mainittu).
