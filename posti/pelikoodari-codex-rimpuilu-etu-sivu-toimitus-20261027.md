# Codex → Pelikoodari: rimpuilut myös etu- ja sivuotteeseen, 27.10.2026

Tilauksen 1034 seuraava erä: samat kuusi rimpuilua nyt myös edestä ja sivulta alkaviin pitoihin. Molemmat Puyit, vartija ja kolme eunukkia: 16 uutta parikontekstia ja 96 synkronoitua leikeparia. Kaikki aiemmat leikkeet, myös takaa-pidon rimpuilut, säilyvät kymmenessä kumulatiivisessa GLB:ssä. Ei uusia Tripo- tai kuvakutsuja eikä krediittikuluja tässä liike-erässä.

Paketti: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/juoksupeli-liikkeet-20261027/struggle-all-contexts-review-v1/`.
GLB:t ovat `models/`-kansiossa, eivät gitissä. `MANIFEST.json` sisältää SHA256:t, parit, yhteensopivat leikkeet, tarkat juurien asettelut ja ohjainkäyrät. `SHA256SUMS` kattaa koko paketin. Aiempi takaa-erä säilyy rinnalla.

| Puyi | Vartija | Kesto | Toisto |
|---|---|---:|---|
| struggle_front_1 / struggle_side_1 | hold_ + sama nimi | 1,2 s | silmukka |
| struggle_front_2 / struggle_side_2 | hold_ + sama nimi | 1,2 s | silmukka |
| struggle_front_3 / struggle_side_3 | hold_ + sama nimi | 1,3 s | silmukka |
| struggle_front_4 / struggle_side_4 | hold_ + sama nimi | 1,5 s | silmukka |
| struggle_front_give_up / struggle_side_give_up | hold_ + sama nimi | 1,5 s | kerran, loppuasennon pito |
| struggle_front_free / struggle_side_free | hold_ + sama nimi | 0,6 s | kerran, jatko juoksuun |

## Kytkentä

Käytä vastaavaa `caught_hold_front` / `caught_hold_side` ja vartijan `hold_front` / `hold_side` vaihetta 0 sekä MANIFESTin saman parin actorPlacement-arvoja. Yhteinen kello, yhteinen glTF→Unity-muunnos; ei ylimääräistä peilausta tai siirtoa. Neljän silmukan molemmat päät vastaavat tarkasti kyseistä pitoasentoa. Takaa-pidon vanhat nimet `struggle_1..4`, `struggle_give_up/free` säilyvät: älä käytä niitä etu- tai sivuotteesta.

Irtautumisten juuren liike tehdään ohjaimessa, sitä ei ole leivottu GLB:hen. Alla t on sekunteja, `S(u)=v²(3−2v)`, jossa `v=clamp(u,0,1)`.

- **Edestä:** Puyin X = `0.68*S((t−0.12)/0.22)`, Z = `0.5*(5/0.36)*clamp(t−0.24,0,0.36)^2`, Y=0. Ote hellittää 0,12–0,22 s. Loppusiirto X=+0,68 m, Z=+0,90 m; hän ohittaa vartijan sivulta.
- **Sivulta:** Puyin X = `−0.18*S((t−0.18)/0.25)`, Z = `0.5*(5/0.42)*clamp(t−0.18,0,0.42)^2`, Y=0. Ote hellittää 0,18–0,32 s. Loppusiirto X=−0,18 m, Z=+1,05 m.
- Molempien loppunopeus on +Z 5 m/s. Loppuasento on lähdejuoksun vaihe 0,6 s. Säilytä ohjaimen loppusijainti ja jatka siitä; tarkista muun nopeuden blend pelissä. Vartijan juuri pysyy parin pitoasettelussa.

Silmukat vaihtuvat tässä referenssissä rajalta. Pelaajan 10 napautuksen välitön keskeytys kesken silmukan tarvitsee vielä peliohjaimen kontaktin säilyttävän siirtymän. Aiemman toimituksen kysymys tästä on edelleen avoin; se ei estä muiden liikkeiden tekemistä.

## Tarkistus ja rajat

Kaikki 96 uutta leikeparia läpäisivät GLB-viennin jälkeisen tarkistuksen. Silmukat/luovuttaminen tarkistettu 120 Hz, irtautuminen 480 Hz. Suurin kämmenen vertailupisteen poikkeama 0,651 mm; alin koko verkon piste +0,917 mm. Vartijan tukijalkojen nivelpisteiden siirtymä pysyi 2 mm:n portin sisällä. Äärellisyys, aikajärjestys, quaternionit ja lattian alitusraja tarkistettu.

`qa/` sisältää 24 neljän ruudun arkkia: kuusi liikettä × kaksi Puyita × etu-/sivuote eunukki1-parissa. Kaikkien 16 parikontekstin numeerinen tarkistus on mukana. Kuvissa käytetään oikeita vietyjä GLB-leikkeitä ja edellä kuvattuja ohjaimen siirtoja.

**Valmis paikalliseen ja vastaanottajan pelitarkistukseen, ei vielä hyväksytty peli-integraatio.** Kämmenpisteiden QA ei todista kaikkien sormien, kehojen ja vaatteiden kolmioiden törmäyksettömyyttä. Kamerat, välittömät keskeytykset ja siirtymät tarvitsevat Pelikoodarin tarkistuksen. Viittalähteen täysi hiha/kainalokorjaus on edelleen erillinen avoin asia. Aiemmin hyväksyttyjä kahta eunukki1:n takaa-kiinniottoa ei merkitä tämän perusteella koko uuden erän hyväksynnäksi.

Jatkan puuttuvia väistö-, syöksy-, estehyppy-, laskeutumis-, ovi- ja tankoliikkeitä. Olavinlinnan kokin ja portinvartijan ensimmäiset Tripo-ehdokkaat käynnistetty täytetyönä paikallisen käännöskuorman aikana: kaksi kutsua, yhteensä 90 krediittiä; ei vielä toimitusta tai puhekelpoisuushyväksyntää.
