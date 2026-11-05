# Natiivisepän luovutus 5.11.2026 klo 16.20 (konteksti 28 %, pehmeä raja, 7.37)

Korvaa -1610:n jonon. Muu -1610, -1558, -1543, -1525 ja -1510 lisäyksineen pätevät. Sessio on Natiiviseppä, kansio Matkakirja-3d-selvittaja. Vuoro aina JU:lta. Lue Raamattu 7.47:n rivi. Remote päälle, T7-Monitor uudelleen (pid 58484, kopioi.log vain ALOITUS 13.28; ei poistoja ennen PT:n lupaa). Luvut 6, 9, 10 ja 12 vievät noin kolmanneksen pehmeästä rajasta.

## Jono
1. JU:n ajo natiiviseppa-liiku-99748962f (ajossa tai jonossa ensimmäisenä): katsottavat -1610:ssä.
2. JU:n ajo natiiviseppa-intro-varitaso-52e3d2940 (pyydetty 16.19, Liikun jälkeen): katso alla, sitten KK:lle ja PT:lle.
3. Jos väritaso ei selitä tyhjää pohjaa tai Notre-Dame jää pieneksi: korjaa saman kuvasarjan perusteella.
4. n-1km-85:n viat (-1558). NUI:n 098cf05cd ("etualan jättinimet") voi korjata jättinimen: katso ensin, ettei tehdä kahdesti.

JU 16.2x: bd0e8e50e ehti käyntiin 16.18 ja pysäytettiin 16.19, kuvia ei tullut. Liiku seuraavana, sitten 52e3d2940 (vahvistettu JU:lle uudelleen). JU ajaa sha:n omassa puussaan, joten oman työpuun muutokset eivät vaikuta ajoon: "työpuuhun ei kosketa" alla ei ole tarpeen.

## Haara: natiiviseppa/saapuminen-porras-219 52e3d2940
Työpuu /Users/Shared/Claude/wt/proto-natiiviseppa-kierto, peili natiivi-backup peili/proto/natiiviseppa/saapuminen-porras-219. Sisältää bd0e8e50e:n ja 52e3d2940:n. tarkista.sh 0 virhettä (tyylikirjan kolme tiedostoa palautettu), PalloLiikeTestit 15/15. Työpuuhun ei kosketa ennen ajon valmistumista. Liiku 99748962f on eri haarassa (kierto-koe), NUI:n kyltit-219:n uudet commitit eivät ole mukana: yhdistä ennen KK:n lopullista kuvaa.

## bd0e8e50e: tyhjä pohja. EI nähty ajossa
Löydös lokeista: kartta katoaa, kun väritaso (kermahuntu, CesiumUrlTemplateRasterOverlay) luodaan uudelleen kohdemaalle laskun alussa. Varitaso.Luo.
- 5282b9fc4: 4,00 s pallo 100 % 137 laattaa → "väritaso: FRA" → 4,26 s 14 % 0 laattaa, ensimmäinen laatta 6,52 s.
- 461a0241e: 4,34 s 37 % 24 laattaa, väritaso juuri ennen, 5,72 s 4 % 0 laattaa.
- f446775c8: väritaso 4,2 s, lataus 86 % → 29 %, mutta laattoja yhä 115. Ei siis aina nollaudu: EN tiedä, miksi tässä ei.
- Selitys, että uusi kerros estää ladattujen laattojen piirron, kunnes sen palat ovat valmiit, on päätelty lokista ja muistista: Cesiumin natiivilähdettä ei ole luettu, ja kerrosta ei ole kokeiltu erikseen.
- Korjaus: Varitaso.KohdeTiedossa(maa), kutsu KarttaKerrokset.EsilataaSaapumisalue (taso ≤ TamaKaupunki, ei linssi). Vaihto tapahtuu lähdössä, voimassa kunnes pelaajan maa = kohdemaa, enintään 300 s. Maan sisäinen matka ei vaihda mitään.
- Lokista katsottava: "väritaso: kohdemaa FRA lähdössä", "väritaso: FRA" heti lähdössä, ei laskun alussa, ja pallo % ja laatat zoomauksen alussa.
- Omia valintoja, kerrottava KK:lle: kohdemaa kirkastuu ja korostusraja (Maaraja seuraa Kohdetta) vaihtuu jo lähdössä, ei perillä; web vaihtaa saapuessa. Koskee kaikkia maiden välisiä matkoja.
- Riski, mittaamatta: loitolta lähdettäessä katkos voi siirtyä lähtöön. Skenaario lähtee 5 km:stä, joten se ei näytä tätä. Jos näkyy, ratkaisua ei ole vielä.
- Portaat 5282b9fc4 voivat olla turhat tai vasta nyt toimia, koska väritaso nollasi myös ennakon laatat. Vertaa `komento maasto saapumisennakko pois` -ajoon, ennen kuin päätät poistosta.

## 52e3d2940: intro (KK 16.01 sanasta sanaan -1610:ssä). EI nähty ajossa
- PeliOhjain.SaapumisKierto: keskipiste 48.8568, 2.3437 (Notre-Damen ja Louvren puoliväli, ennen Concorde), KaariAst 0.0335 (noin 4 km, ennen 6,6). Laskelma: Notre-Dame noin 300 px iPadilla (i03:ssa 140 px, oletus: etäisyys ennen noin 8,5 km). Kuvasta tarkistettava, oma arvio. Loppunäkymä ja 60° ennallaan: kamera nousee takaisin 6,6 km:iin kierron lopussa.
- Kierron keskipiste oli i03:ssa ruudun keskellä, kuten koodista oletin (Concorde lähellä keskikohtaa): rakennukset olivat ylhäällä, koska keskipiste oli väärä.
- UiNakymat.OtsikkoPiilo ja Saapumistraileri.NimenAika: kerros Nostot häipyy nimen ajaksi (vain aloituslento). Nimen lähtö tai Lopeta palauttaa.
- OLETUS, tarkista i07:stä: isot kursiivinimet (Parc Monceau) ovat kerroksessa Nostot. Päättelin tämän -1510:n havainnosta, että `ui lentopiilo` vei ne; Nimikerros.cs:ssä ei ole UiKerros-viittausta. Jos nimet jäävät, ne ovat muualla, esim. KarttaKerrokset-kerros.
- "PARIISI, RANSKA" on kartan odotusilmaisin (SaapumisOdotus, nimi ja Latauspalkki, sama rivi kuin iskulauseen alla näkyvä palkki), ei otsikon osa. Lähtee nyt otsikon alkaessa, vaikka lataus jatkuu. Lokissa se oli päällä i07:n jälkeenkin.
- Sumeus i07:ssä: EI selvitetty. Skenaariossa on jo `maasto siirtyma 5 0 30`, joten kyse ei ole pelkästä 640×480-valinnasta. Etuala terävä, keskialue sumea. Kuvan otto vie noin 0,9 s kehysaikaa (pitkä ruutu 916–949 ms joka kuvalla), joten kuvasarja voi itse hidastaa latausta. Katso uudesta ajosta, onko sumeus yhä; KK:lle kerrottava erikseen, ettei tätä ole ratkaistu.
- i07:ssä kuvan alla oli yhä muita kohtia, joita KK ei pyytänyt: taivas noin 28 % ruudusta. Ei muutettu.
- KK:n aiempi: ruutusarja KK:lle, omistajalle vasta, kun Notre-Dame seisoo kuvassa. PT:n rivi -1543:sta yhä kerrottava: alle 20°:n varatapa ei enää käy, saumakorjauksen ratkaisu loppumittauksessa.

## Muuta
Zsh: `echo ====` kaataa komennon, ja `*.uss` ilman osumaa kaataa komennon. tarkista.sh muuttaa aina tyylikirjan kolme tiedostoa (Tyylikirja.uss, Tyylikirja.cs, tyylikirja.json): git restore ennen committia. Työpuu wt/proto-natiiviseppa-kierto-koe on Liikun ajossa.
