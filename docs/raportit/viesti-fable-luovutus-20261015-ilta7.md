# Päätoimittajan luovutus 15.10.2026 klo 22.5x (konteksti 30 %; tili vvi@vvi.fi)

PT local_5df52e10-10e4-4b72-9554-0049db300dfe, KK local_dfa7296a-d3d3-41ef-a2b1-dbc42a652589. Id:t /Users/Shared/Claude/osoitekirja.md. Asemataulu https://claude.ai/artifact/Qo5w6Wk4JSYRwYbyf2fJrm; paikalliset muutokset scratchpad/asemataulu/data/talo/junat.json (Postivahti vie). Kaikki päätökset 21.03–22.40 kirjattu lokiin (#4655, #4656, #4660, #4667, #4668, #4669, #4673, #4674).

## 0. Heti aluksi
RC päälle, odottajavahti-Monitor, get_usage self. Codex-posti: `git log origin/claude/postilaatikko --since="60 minutes ago"`. HUOM: vastaukset Codexille aina posti/-PÄÄKANSIOON (21.13: LR:n vastaus jäi alikansioon, Codex odotti turhaan).

## 1. Omistajan päätökset tällä vuorolla
- 21.03 + 21.07 kohdevalikko: tumma, isot kuvat, nimi alareunaan; "yöllä"-sanat JÄÄVÄT. Tehty (NUI nimet-196), iPhone-simulla todettu (reunavika ja "/c" olivat vanhaa buildia).
- 21.29 "Hyväksyn kaikki": İzmir + 36 Euroopan kaupunkiesittelyä (PT tarkisti faktat, Marseille korjattu) → web #4661 mergetty 90c2cabb8.
- 21.35 OMISTAJA PYYSI JULKAISUA juna 195 ("Ei testejä") → lukittu 21.46 BUILD 64e1efcd1; TF sisäisillä 22.03, ulkoisilla 22.27, Mac TF 22.02.
- 21.48 "Julkaise ilman unta" → IsoisanUni kiinni junissa 195/196; unen uudistus työlistaan ilman kiirettä (KK tuo suunnan).
- 22.05 paketti hyväksytty junaan 196 (NIMET, uusi ulkoasu, taivastila, paras hetki + korostus → PÄÄLLÄ, NS b532d363d). "Lisää kaikki jo kortteina": kaikki 9 kohokohtaa kortteina heti, ei Tulossa-merkintää.
- 22.06 kohokohdat ja kohteet samaan vieritettävään ikkunaan, kohokohdat 3/rivi.
- 22.37 etsin junaan 196, kehitys lyhyeksi: kortti ~5 s pikakuvalla, tarkka vaihtuu taustalla; alarivi "korkeus 429 km".
- 22.40 minimaapallo isommaksi + kaikki pääkaupungit ja kohteet, nimi pallon päällä/vasemmalla (peukalo); kameran kortissa pieni ilmoitus ("Kuva tarkentuu…").

## 2. Junat
- TF 195 valmis (ks. yllä). Juna 196 runko b532d363d (NS, testit vihreät), lukitus vain "OMISTAJA PYYSI JULKAISUA". Jonossa: Valosepän tulivuoret k5 + salamat k2 (käännös 88f198070), NUI 9 kortin ikkuna cb2ff213d, PK+NUI etsin f264f428e, NUI minipallo a67af930e (+ KS 0e5565382), LS1 revontuliskanneri (R1-korjaus 98bb309f9, kuvat-196e), Black Marble mukana. CupolaAurinko päällä (VS 240357565).

## 3. Omistajalle näytettävä (kun valmis)
- 9 kortin valikko: kuvat 151c6fd3 OK paitsi korttinimet katkeavat keskeltä sanaa → NUI korjaa (PT 22.55), sitten iPhone + iPad omistajalle ennen kohokohtien kytkentää.
- Etsimen kortti (PK ottaa iPhone-kuvat) ja minipallo (iPhone) ennen kytkentää.
- Revontulet skanneriin (LS1, uusi R1 tulossa).
- Pulun 4 uutta ISS-kysymystä Tekstit-osastossa odottavat omistajaa (PT tarkisti faktat; KK tietää) → hyväksynnän jälkeen Äänittäjä (pysyvä lupa) + PK kytkee.
- Aloitusvihjeet kartan päällä (NUI: pysty valmis, vaaka uusitaan).
- Auringonnousu: kortissa NASA-kuva (kaikki 9 samaa tyyliä); SS varmistaa Cupola-ajolla, että aurinko nousee hetkellä 04.18 (bae6eee4c).

## 4. Muut avoimet
- Louvre: tavoitteet K1, K4–K7 hyväksytty (K2/K3 LiDAR-maskista); ulkoasuvaihe valmis 22.46. Pyramidi Googlelta (omistaja 17.17) – EI mallinneta. Valoseppä ottaa v2f-parin (kulma B) → LR:n seuraaja arvioi → julkisivujakso.
- KS: 11 pääkaupunkipaketit ämpäriin, pallopisteet #4675 (mergeää vihreänä). 11 uutta pääkaupunkia EIVÄT ole OPAS_SALLITUT-listalla – vain omistajan päätöksellä.
- Euroopan linnat -linssi EI (omistaja 12.10.); PT antoi sen vahingossa, LS1 pysäytti.
- Äänittäjä: 37 kaupunkiesittelyn äänitys (~24 000 mrk) vaatisi omistajan erillisen luvan; ei ehdotettu.
- SS:n luovutus 89114622e muutti .claude/settings.local.json-tiedostoa (lupa-asetukset vain omistaja) – PT ei koskenut.
- Jäännöskansio /Users/Shared/Claude/wt/fable-loki-2103 (ei git-worktree; Postivahdin tarkistus).
- Nollattu tällä vuorolla: Karttaseppä, Natiivi-UI (2×), Julkaisija, Siirtoseppä, KK, Linssiseppä, Natiiviseppä, Valoseppä, Linnanrakentaja.
