# Natiivi-UI: luovutus 7.11.2026 klo 02.21 (konteksti 31 %, pehmeä raja)

Itsenäinen: korvaa kaikki aiemmat. PT local_5df52e10-10e4-4b72-9554-0049db300dfe, KK local_37f7c945-e1a0-4638-90b8-93c389a36fbe, JU local_06f8c680-4618-42bd-a730-9b6a3e17e0b7. Viestit send_messagella id:llä, PT:lle enintään 3 riviä.
Proto-repo /Users/Shared/Claude/proto-3d/Matkakirja-proto, etäpää natiivi-backup (ei origin). Worktree /Users/Shared/Claude/wt/proto-natiivi-ui-kyltit-219, haara natiivi-ui/kyltit-liike, kärki 29bea235c. Lokit /Users/Shared/Claude/proto-3d/lokit/, skenaariot _tyo/natiivi-ui/. Kaikki kokeena, ei junaan. Kääntö: sh Peli-testit/unity-tarkistus.sh (noin 1 min). Ajot JU:lta.

## TYÖ: Pariisi kohta 8, kyltit ja nimet liikkeessä (PT 02.0x; KK:n päätös omistajan valtuutuksella 02.20)
Kaksi yritystä per vika, sitten KK:lle kuva ja syy aamuun, ja seuraava. Tallennetta ei leikata. Tulos KK:lle (kuvat, videot, aika, viat leikkaamatta), rivi PT:lle. Kun tehty: PT:lle "JONO TYHJÄ: Natiivi-UI".
Pohja: 81db2de0e (k04, kuvapallot, laattapaketti) + NS:n Karsi 7fd402eee = 94030ed72 (ristiriita vain kommentissa, Sisaltokerrokset) + vilkkumisen korjaus e818cdc5f + kylkiloki 29bea235c. Lokirivi kylkivaihto otetaan pois junaan vietäessä, kuten `ui kuvajumi`, mittausrivit, ae497b124 ja paketin rivit.

KK:n päätökset:
1 Vilkkuminen: e818cdc5f PIDETÄÄN (NostotKartalla.KylttienTormays, kylttiVaihto + Vakaa 0,35 s). Hinta tiedossa: lyhyt päällekkäisyys.
2 Tuileries'n 2 kuvan katoaminen: EI jatkotyötä.
3 KYLKIVAIHDOT, TYÖ: kyltti pysyy samalla puolella lennon ajan. JU ajaa nui-kyltit-liike-3 (29bea235c, sk-kyltit-liike.txt, kuittaa tähän id:hen): `grep kylkivaihto lokit/nui-kyltit-liike-3/unity.log` kertoo id:n, puolet ja ruudun. Lennot alkavat noin 22 s ja 26 s tallenteessa; edellisessä ajossa 17 vaihtoa lennolla Notre-Damelle. Laskuri ja rivi: NostotKartalla.cs vetoKyljet, noin rivi 1970; lukot[s.Id] Ele = true. Mallikyltit erikseen: MalliKyltit.cs rivi 119 (Notre-Dame 0→2→0→1, Sainte-Chapelle): selvitä, koskeeko sama lukko niitä lennossa.
4 KUUMAILMAPALLO, TYÖ: Temple-tornin kyltti pysyy luettavana pallon edessä (ajo nui-kyltit-liike 16,5–18 s, kuvat 825 ja 900). Pallo: PiirrosKerros.Animaatiot.cs (komennot Komennot.cs noin 961). Selvitä ensin, miten pallo piirtyy kyltin päälle, kun kyltit ovat UI:ssa.
5 RANSKA-tekstin yli kulkeminen: EI vika.
6 85°, TYÖ: kaukaiset kyltit häipyvät usvaan kartan mukana eivätkä kasaudu horisonttiin; lähimmät jäävät luettaviksi. Malli: Horisonttiusva.SyvyysPeitto ja KylttiNakyvyys (MalliKyltit.cs rivi 93, kierto.UsvaPeitto), NostotKartalla m.Usva. Katso nui-kyltit-liike-85: 7,0 s, 8,8 s, 19,4 s, kohdat Palais Garnier ja Metrosema Louvren alla, Grand Châtelet Notre-Damen alla, Panthéon Luxembourgin alla. Skenaario sk-kyltit-liike-85.txt: zoomi sisään ei muuttanut kameraa (kamera.txt kuvat 0 ja 249 samat), eli kokeile lähempää aloitusta vain, jos tarvitset.
7 Eiffelin läpi lentävä kamera: PT jakaa, EI minun.

## Työkalut (kirjoita uudelleen, jos scratchpad on poissa; vain Pillow, ei numpy)
Mittaus: joka kuvan histogrammista tummat < 60 ja vaaleat ≥ 240, 688 px:n koossa; hypyt > 300 kuvien välillä = kyltti pois tai päälle. Paikka: maskien ero ruudukossa. Nauha: rajaus tapahtuman ympäriltä, kuvat −4...+3. Arkki: joka n:s kuva numeroituna. Vertaa samaa tapahtumaa ajojen välillä: ajastus siirtyy kymmeniä kuvia, joten kuvanumerot eivät ole vertailukelpoisia.
Video: zsh tyokalut/tallenne-video.sh <lokikansio> <nimi> <ulos.mp4> (ajetaan worktreestä).
Valmiit videot KK:lla: lokit/nui-kyltit-liike-2/liike.mp4 ja lokit/nui-kyltit-liike-85/liike85.mp4.

## Opit
- TALLENNE: peli askeltaa pysäytettynä 0,02 s/kuva, Time.unscaledDeltaTime kulkee sen mukana (kaupungin nimen 0,22 s = 10 kuvaa), mutta UI Toolkitin siirtymä kulkee oikeassa ajassa (0,22 s = 2 kuvaa). Kyltin häivytystä ei voi arvioida tallenteesta, ja lyhyet katoamiset näyttävät jyrkemmiltä kuin pelissä. Päätelty kuvista, ei mitattu erikseen.
- Kallistus 85° eli 5° horisontista: eleellä `kallista 0.40 0.60 3` kulma jäi noin 60–70°:een; `komento kallista 85` asettaa heti.
- Iso PARIISI oli KaupunkiMerkit-nimiö: pienkapiteeli (P iso, muut 0,8) kertoi kerroksen. Laajat git grep/log -S voivat kestää yli 2 min: rajaa polulla.

## Yön aiemmat, valmiit
k04 81db2de0e (nimi häipyy yli 45 %:n leveydellä; vain Mac, koskee kaikkia kaupunkeja; kuvissa 88–97 ei kaupungin nimeä). k05, k01f, k12–k13: ei korjausta. Kuvapallot 7ffd6ab5f kelpaavat kokeena. Meren suorakaide ei minun.

## Avoinna, ei minun ilman PT:n sanaa
POIKKEUS ArgumentOutOfRangeException odota-tila-rivillä (kaikissa ajoissa, syy selvittämättä). Tyhjä pohja ja vino reuna 356eb0101; jumin 9,16 s; kylmä levyvälimuisti; Invalidit `ui kohdenostot kyltti`; tappien lasku vaakapuhelimelle. Havaintoja: 85°-ajossa etualalla sahalaitainen tumma alue vasemmassa alakulmassa (kuvat noin 352–528); Livian ohjeteksti sumean kartan päällä; suurennuslasin haalea neliö.
