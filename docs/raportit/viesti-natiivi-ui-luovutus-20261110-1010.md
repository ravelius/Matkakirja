# Natiivi-UI: luovutus 10.11.2026 klo 10.10 (kontekstivahti 27 %; korvaa -20261110-0936:n)

PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31, JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd, NS local_0f7f169f-2ceb-43d2-8fb4-223dda2c0870.
Natiivirepo /Users/Shared/Claude/proto-3d/Matkakirja-proto (remote natiivi-backup). Tarkistus `sh Linssit-testit/unity-tarkistus.sh`
(0 virhettä kaikissa alla). Skenaariot /Users/Shared/Claude/proto-3d/_tyo/natiivi-ui/, lokit /Users/Shared/Claude/proto-3d/lokit/.
Mac-esikatselu vain JU:n vuorolla. Kaikki haarat = juna 224 3bbe27523 + omat commitit.

## TYÖLISTA ON JONO: T=/Users/Shared/Claude/Matkakirja-fable/tools/asemataulu/tyolista.py
`python3 -I $T seuraava NUI`; valmis `python3 -I $T tehty "OTSIKKO" "mitä, sha, kuvat"`; välitila `tilanne "OTSIKKO" "teksti"`.
Jono 10.10: NYT "Kaikki klikattavat paikat avautuvat esittelynä" → [1] "Museon latausilmaisin" → [100] "Kerronnan tauko …",
[100] "Maan pienoiskartta …", [100] "Kuvakyltti … (koe)" (PT 09.5x: pienoiskartta ja tauko ennen kuvakylttiä). KAIKKI VIISI KOODATTU;
kaikki odottavat JU:n Mac-ajoja, jotka JU kuittasi jonoon tässä järjestyksessä. [40] iPhone-valikko ja [603] pallonapit merkitty
`tehty` (junassa 224, omistajan 09.32 päätös: ei iPhone-mittausta) → odottavat PT:n kuittausta.

## JU:N AJOT (polut tulevat viestinä; lue loki ja katso kuvat itse ennen PT-riviä)
1. KLIKATTAVAT: natiivi-ui/klikattavat-esittelyt 3edc0a5e5, sk-klikattavat-1-{pariisi,lontoo}-mac → nui-klikattavat-1-{pariisi,lontoo}-mac-3edc0a5e5.
   Lue `ui klikattavat` -rivit: KUOLLUT → korjaa UI; "kortti (ei kirjoitettua juttua)" / "tietokortti (ei kirjoitettua esittelyä)" =
   sisällön puute → listana PT:lle. b-1/b-2: tavallinen nosto palkkina + kierto. Sitten kuvat PT:lle (≤ 3 riviä) ja `tehty`.
   (Yksityiskohdat edellisessä luovutuksessa: git show d9f8a9073:docs/raportit/viesti-natiivi-ui-luovutus-20261110-0936.md, kohta 1.)
2. MUSEO: natiivi-ui/museo-latausilmaisin 37eba712e, sk-museo-ilmaisin-1-mac → nui-museo-ilmaisin-1-mac-37eba712e. i-1/i-2 nimi + palkki +
   ☰ näkyvät, i-3/i-4 loki "latausilmaisin pois, päättyi". Kuvat PT:lle, `tehty`.
3. KERRONNAN TAUKO: natiivi-ui/kerronnan-tauko-kierto a8bfc9d3e (worktree /Users/Shared/Claude/wt/proto-nui-tauko — HUOM se on nyt
   haaralla natiivi-ui/kuvakyltti-koe; tauon haara on pushattu). Muutos: PalloKierto.KierronTauko + ajo.tauko/vauhti (Etene: kierron aika
   hidastuu 0,6 s:ssa nollaan vasta KohdeKierto.KierronAlkuS:n jälkeen, jatko kiihtyy samasta kohdasta); NahtavyysEsittely asettaa sen,
   kun esittelyn kertoja on tauolla (Puhe.Instanssi.Tauolla ja LuettavaOmistaja = luettava). Testi PalloLiikeTestit.
   TopoKiertoTaukoSeisooJaJatkuuSamaanLoppuun (Linssit-testit/kaanna.sh TopoKierto 3/3). `ui pinnaus napauta-tauko` = palkin taukonapin
   oikea napautus. Skenaario sk-kerronnan-tauko-1-mac → nui-kerronnan-tauko-1-mac-a8bfc9d3e: t-1 ja t-2 sama suuntima ja "kierto seis",
   t-3 suuntima muuttunut. RISKI: jos `ui pinnaus napauta-tauko` sanoo "ei palkkia", esittelyn palkki ei ole Pinnaus-palkki → etsi
   oikea taukonappi (KortinLukija.Vaihda tai Nostokortti) ja tee uusi ajo. Mac-pari PT:lle, `tehty`.
4. MAAN PIENOISKARTTA (koe): natiivi-ui/maan-pienoiskartta 5d01e2c25 (worktree /Users/Shared/Claude/wt/proto-nui-pienoiskartta).
   UI/Kartuscha.Pienoiskartta.cs (+ .meta): nappi mk-kartuscha__pienoiskartta kartussin ensimmäiseksi lapseksi (nimikilven yläpuolelle),
   näkyy kun korkeus < 0,7 × PalloKierto.MaanKattoM ja MaanNakymanMaa = kartussin maa (tai paluu odottaa); renkaat
   Saapumisrajaus.Renkaat(iso) laudan projektiolla PalloKierto.MaanNakymanLaatikkoon, Painter2D: pergamentti + muste MapInk85; piste
   #9a3b2c. Napautus: PalloKierto.AjaMaanNakymaan(1,6 s) ja paluu NykyinenNakyma → toinen napautus AjaNakymaan. Levossa peitto 0,6,
   kosketus 1 (1,5 s). LiikeTappi väistää kartussin laatikkoa. `ui pienoiskartta [napauta]`. Skenaario sk-pienoiskartta-1-mac kahdesti
   → nui-pienoiskartta-1-{ipad,iphone}-mac-5d01e2c25 (p-1 näkyy + piste Pariisissa, p-2 koko maa, p-3 sama km kuin p-1, p-4 piilossa).
   iPad-kuva PT → KK ennen junaa (KK:n lisäys: ei peukalorenkaan päällä — tarkista p-1:stä).
5. KUVAKYLTTI (koe): natiivi-ui/kuvakyltti-koe 153602c0f (worktree /Users/Shared/Claude/wt/proto-nui-tauko). NostotKartalla.Kuvakyltti
   (`ui kohdenostot kuvakyltti 0|1`, oletus pois): Merkki.KuvakylttiOn/KuvakylttiT/KuvakylttiPiste; KyltinLaatikko-haara (kyltti alkaa
   medaljongin keskeltä, täyte 15 px, USS --kuvakyltti), AsetaKuvanPaikkaVain-haara (medaljonki D 22 pt), KuvakyltinKeskiX (liuku 0,25 s),
   ★ merkin lapseksi pisteen yläpuolelle (AsetaTahti), medaljongin napautus → Napautus(m). Skenaario sk-kuvakyltti-1-mac (iPad) →
   nui-kuvakyltti-1-mac-153602c0f: parit 1a/1b kallistettu, 2a/2b ylhäältä, 3a/3b kaukaa. PT → KK. EI junaan ilman korttia.
   AVOIN: "tähdet väistöön" (PT:n kuvaus) tekemättä — ★-laatikko KylttienTormaukseen varaukseksi ennen kylttejä; medaljongin vasen
   puolikas ei ole törmäyslaatikossa.

## AVOIN EDELLISESTÄ
- Lyhyt versio 14877fa07: JU:n iPad-☰-kuva linkistä 224.7 katsomatta → katso, kun JU lähettää.
