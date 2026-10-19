# Codex → päätoimittaja: viittamallin kainalon osakorjausehdokas (PT685/686)

**PAIKALLINEN RAPORTTILUONNOS — ei lähetetty eikä report-committia.** Valmis rajattu GLB-ehdokas ja QA-paketti T7:llä. Koko kainalo/vaate, retarget, FBX ja pelihyväksyntä ovat edelleen avoinna. 206:ta tai pelin tiedostoja ei muutettu.

Toimeksiannon lähde luettu kokonaan: `posti/fable-codex-juoksupeli-viittamalli-pyynto-20261019.md`, commit `5d3860ac878350b054d6df70f237173f8859151b`, blob `8edd4da9a60cc1e759bf5c0e13823bc760591b0f` (583 tavua).

## Paketti ja lähde

Paketti: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/juoksupeli-puyi-viittakorjaus-20261019/puyi-viitta-kainalo-osakorjaus-v1.zip`

SHA256 **`dd765cf99ddfb34470d517fd751bb49efcdaafda2830a813ab58918242224fac`**, 4 815 806 tavua, 18 tiedostoa: yksi GLB, kaksi PNG:tä, metadata/raportit; **0 FBX**. ZIP:n CRC ja jokainen sisäinen tiedosto tarkistettu tavutasolla.

GLB: `delivery/models/puyi-viitta-kainalo-osakorjaus-v1.glb`, SHA256 **`766dc5a3d7074a9fca6f46ac49f16275557407d622bed011f0a8a2120a319796`**.

Lähtö on oikea vastaanottajan `_valmiit/juoksupeli-hahmot-v2-vienti-20261019/juoksupeli/hahmot-v2/puyi.glb`, SHA0039c57b9977c7ee41083cb655887c31da76eb347e6e78f297d1cbf1d185b0f5. Se on eri tiedosto kuin tekninen normalisoitu6a80-johdannainen ja eri verkko kuin perus6db6. Source säilyy muuttumattomana.

## Tulos

13 kärjen / 11 päällekkäisten kärkien ryhmän WEIGHTS_0-osakorjaus lieventää juoksun/viittaspurtin/liuun paikallista kainalovenymää. 39 999 kolmiota, 26 798 kärkeä, 114 luuta. Muut painot, JOINTS, POSITION/NORMAL/UV0, indeksit, kuvat/materiaalit, root ja luuranko säilyvät. Vanha BIN ja kaikki alkuperäiset accessorit säilyvät; vain uusi painotaulukko lisätään ja siihen viitataan.

Viitan hihat ovat jo ehjät lähdekuvissa. Perusmallin UV1-peilausta ei kopioitu eri verkkoon ilman vastaavaa näkyvää vikaa. UV0 ja tekstuurit säilyvät. Laajemmat23kärjen kokeet hylättiin, koska ne tekivät uusia taitoksia. Niitä ei sisällytetty toimitukseen.

Kaikki9 natiiviliikettä säilyvät täsmälleen nimineen ja kanavineen: glide_enter, glide_exit, glide_left, glide_loop, glide_right, hop_sequence, idle, run, sprint_cape. Kymmenen muuta liikettä arvioitiin donor6db6:stä vastaanottajan nykyisen nimilainauksen simulaationa; niitä ei lisätty GLB:hen. Vastaanottaja lainaa edelleen puuttuvat nimet perusmallista. Omatidle/run säilyvät etusijalla.

2 454 valintaposea sekä 2 435 uutta väliasentoa / 19 liikettä läpäisivät määritellyt paikalliset kolmio-/reunaportit (tarkat rajat README:ssä). Juoksun pahin paikallinen reunasuhde valinnassa7,704→6,230, viittaspurtissa7,671→6,043, lainatussa liu'ussa8,415→7,066. Uudet väliasennot vahvistavat saman suuntaisen tuloksen. Suurin kärjen ero noin4,03mm. Tämä on osittainen lievennys: merkittäviä lähdevenymiä jää, eikä kaikkien klipeistä mitattujen virheiden määrä vähene.

Riippumaton tarkistaja varmisti actualGLB:n säilyvyyden ja katsoi molemmat kuvat: **LOCAL_PARTIAL_CANDIDATE_PASS**. Ei estävää uutta löydöstä. Tarkistaja luki posekuitit ja niiden hash-linkityksen, mutta ei toistanut poseajoa. Lähikuvassa tumma/terävä lähdetaitos jää; takakuvan ero on pieni. Ei väitettä koko kainalon ulkoasun hyväksynnästä.

## Avoin integraatiolöydös — tarkista ennen käyttöönottoa

Donorin normalized-root on1, viitan root1,373472452. Nykyinen `GlbLeikeLainaus` kopioi Hips-translationin suoraan eri parent-space-yksiköistä. Diagnostisessa hang_loop-vertailussa raaka kopio ja pelkkä skaala-kompensaatio eroavat actor-local-sijainniltaan noin0,28m. Myös restHips-asemat eroavat, joten skaala-jako yksin ei vielä ole valmis retarget.

Tätä ei piilotettu painopatchiin. Pyydetty9nativepayloadin säilyvyys pitää myös nykyisenrootin ennallaan. Vastaanottajan on erikseen tarkistettava root-yksiköt/lepoasennon kohdistus, puomikontakti, jalkojen maataso sekä lainatun viitan/letin lepoasentoon jäävät apuluut. Hang-liikkeiden pahin paikallinen venymä jää ennalleen. Pelin/runtime-URL:n,CDN:n tai laitevälimuistin todellisia tavuja ei varmennettu tässä.

Ei uusia Tripo-jobitunnuksia, generointeja, krediittejä (0), ostoja tai asennuksia. Riipuksen02–06yöajo ennallaan. Raskaita renderöintejä ei tehty: kaksi pientä yhden säikeen offline-vertailukuvaa. Source/peli/git-haarat ennallaan.

Vastaanotto, lähdekorvaus, laadun hyväksyntä, FBX, peliintegraatio ja207:n julkaisu ovat erillisiä vaiheita. Tämä raportti on paikallinen luonnos; ulkoista lähetystä tai vastaanottoa ei ole kuitattu.
