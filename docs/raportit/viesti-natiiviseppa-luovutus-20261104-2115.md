# Natiivisepän luovutus 4.11.2026 klo 21.15 (konteksti 27 %, PT:n sana, 7.37)

Korvaa luovutuksen -1658 ja sen lisäykset. Id:t: /Users/Shared/Claude/osoitekirja.md. Cron Unity-beeta: luo uudelleen ("4 9 * * *", muisti unity67-paivitysseuranta). Vuoro aina JU:lta.
Luovutushaara natiiviseppa-luovutus-2052 (PR 6215), työpuu wt/natiiviseppa-luovutus-2052. Python, jossa numpy ja PIL: /opt/homebrew/bin/python3.

## TYÖ: muistin kevennys (omistaja 20.15; suunnitelma /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261104-muistin-kevennys.md)
Tavoite: peli ei kaadu eikä näytä huonommalta, ja uudelle sisällölle on tilaa. Raja 4080 Mt pysyy. Ei junaan ilman omistajan pyyntöä.

### Kohta 0 valmis, PT kuitannut ("järjestys pysyy")
Tulos _tyo/natiiviseppa/muistikuva/tulos.md. Erittelemätön 1,3 Gt: Unityn natiivi 685, Unityn ulkopuolinen 399, grafiikan loput 153; kuva nimeää 277, noin 800 Mt jää nimeämättä. Kumpikaan kuva ei huipun hetkeltä.
Koehaara natiiviseppa/muistikuva 303a71dfb (proto, työpuu wt/proto-natiiviseppa-muistikuva, ei junaan). Uusi kuva: kuva-ajo.zsh + pura.zsh samassa kansiossa. Development-käännöksessä --console antaa error 22; skripti ei käytä sitä. Kuvat 859 + 752 Mt lokit/natiiviseppa-muistikuva-303a71dfb: voi poistaa, kun kohta 2 on valmis.

### Kohta 2 seuraavaksi (PT:n sana): ensin normaalit ja taivas, sitten Napakalotti
**PT: "säästö mitataan iPadilla ennen kuin sitä kutsutaan säästöksi."** Kaikki luvut alla ovat laskettuja.
1. **Normaalit:** 67 kpl, 276 Mt (kuva 2), RGBA32, ASTC 4×4:llä −207 Mt. JuoksuV4Maailma.cs:797–798: ei Compressia. Nämä ovat jaettuja (jaetutKuvat, KuvaNormaali).
2. **Taivas:** "juoksupelin taivas v3 (palat)" 8192×2048 RGBA 64 Mt, ASTC:llä −48 Mt. Lataajaa ei ole vielä etsitty.
3. **Napakalotti (Pariisi):** 4096² 85 + 2048² 21 Mt, −79 Mt, vain Pariisissa, kuvaparit. NapaKannet.cs:451–474. Palatsissa KartanMuisti vapauttaa ne jo.
4. **Mahdollinen lisä, ei tilattu:** media-osoitteiden kuvat 51 kpl 128 Mt (latauskuvat, Lontoon julisteet); enintään −96 Mt. Käyttöä juoksun aikana ei ole tarkistettu.
**Tekotapa (ehdotus, PT ei ole vielä kuitannut):** valmis MatkakirjaKuvat_PuraAstc (Kartta/Natiivi/MatkakirjaPurku.mm:166; malli PiirrosKerros.Purku.cs, taustasäie + LoadRawTextureData + Apply(false,true), 252c190dc). Sama muistitulos kuin valmiiksi pakatuilla tiedostoilla, ei media-vientiä (media-vienti muuttaa julkaistua). Suunnitelman "valmiiksi pakattu" on silti kirjattu tavoitteeksi: kerro PT:lle poikkeama.
**Avoimia:**
- Normaalien lataus on synkroninen silmukka (rivi 763–841): pääsäikeessä pakkaus olisi 2048²:lla satoja ms latausruudussa, taustasäie vaatii rakennemuutoksen. Mittaa kesto.
- ASTC:n laatu normaaleissa: ImageIO:n kooderi on tehty väreille. Kuvaparit lähelle (kivipinnat, katot) ennen kuin luvut lähtevät; Compress-polku käänsi Pariisin 3.11. syystä (nykäys), ei laadusta.
- Mac (Editor, BC) tarvitsee oman polun; PiirrosKerros.Purku on vain iOS:lle.
- Vertailu: Release, sama reitti kuin _tyo/pelikoodari/muisti-ovet/lahtotaso.zsh. d9cde0f50: huippu 4003, viimeiset 60 s 3636 Mt. Tuo reitti on eri kuin kuva-ajo.zsh:n.
- JuoksuV4Maailma.cs: PK tekee kohtaa 1 riveillä noin 2623–2633 ja 3051, haara pelikoodari/muurin-runko-219. Ei osu kohtaan 2; sovi PK:n kanssa, jos osuu. Rungon valinta (d9c vai 789) kysy PT:ltä.

## Työ, ei kosketa ilman sanaa
- **Maakuntarajat b2101b95e (natiiviseppa/maakuntarajat-katko):** PT 21.0x: ei korjausta nyt, päätelmä jää tiedostoon, kunnes striimin versio on päätetty. Tummuus p-t110 60–64, p-t113 62–65, p-t105 29 (haalea pisteviiva), karkea 89–92. _tyo/natiiviseppa/maakuntarajat/tulos.md, loppu. FIN ja ranska-italia mittaamatta.
- **Kallistus f0e256d9b (tasainen-striimi-3):** ei uusia ajoja, KK päättää. _tyo/natiiviseppa/striimi-sauma/tulos.md.
- **h-z13-sauma:** veden väriloikka z ≤ 11 | z ≥ 12 (ElavaTyyli.cs:490, :564). Ei korjausta ilman sanaa.
- **p-z15:** d9cde0f50 on runko ilman 694e1783a:ta ja e4180ac69:ää, ei kylmä tila. Vaakaraja ja taivaan portaat auki, p-z13- ja h-z13-paria ei katsottu.
- **Versioriski:** VS:n yhdistelmä tarvitsee version > e20. Yhdistelmää tasainen-striimi-3 + maakuntarajat-katko ei ole tehty.
