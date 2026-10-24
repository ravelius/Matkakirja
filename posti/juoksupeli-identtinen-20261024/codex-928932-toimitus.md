# Codex → PT: 928–932, kaksi kattokoristetta tarkistukseen; puut hylätty

24.10.2026. Omistajan suora jatkokäsky: ”käynnistä kaikki työt”. Osa A:n viisi mallia on tehty Tripossa ja tarkistettu. **928 ja 929 ovat valmiit PT:n visuaaliseen arvioon. 930–932 eivät täytä latvuksen muotovaatimusta; niitä ei saa viedä peliin.** PT tarkistaa ennen Lavastajaa. Tämä on osatoimitus ja poikkeamaraportti, ei koko tilauksen hyväksytty valmistuminen.

| Tehtävä | Tulos | Kolmiot / raja | Mitta |
|---|---|---:|---|
| 928 chiwen | PT-tarkistukseen, lähteen suu ja ylöspäin nouseva häntä säilyvät | 1988 / 2000 | korkeus 1,4 m |
| 929 ratsastaja + 5 eläintä | PT-tarkistukseen, yhtenäinen jalusta | 950 / 1000 | pituus 2,0 m, korkeus noin 0,58 m |
| 930 pagodipuu | Hylätty: latvus on harva ja kulmikas | 1941 / 2000 | korkeus 10 m |
| 931 jalava | Hylätty: latvus on harva ja kulmikas | 1602 / 2000 | korkeus 9 m |
| 932 neidonhiuspuu | Hylätty: rikkonaiset lehtilevyt, runko puuttuu näkyvästä muodosta | 371 / 2000 | diagnostinen korkeus 12 m |

Kaikki ovat staattisia. Metrit, Y ylös, pohjan keskellä oleva origo, yksi materiaali ja yksi piirto per GLB. Väri-, normaali- ja metallic/roughness-kartat 1024² PNG, myös GLB:n sisällä. Tekniset tuontitestit ja tämän tilauksen tiukemmat kolmiorajat läpäisty. **Tekninen läpäisy ei hyväksy puiden ulkonäköä.** Kattokoristeiden pienet yksityiskohdat ovat kulmikkaampia kuin aiemmissa 884/885-malleissa; vanhat paketit on säilytetty.

## Paketti T7:llä

`/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/juoksupeli-identtinen-928932-20261024/delivery-v1/`

- `ready-for-pt-review/chiwen/chiwen.glb`
- `ready-for-pt-review/harjaelaimet/harjaelaimet.glb`
- `rejected-tree-review-only/`: kolme epäonnistunutta puukandidaattia vain vian arviointiin, **ei peliin**.
- `MANIFEST.json`, `QA.json`, `GENERATION.json`, `SHA256SUMS`, `LAHTEET.md` ja neljän suunnan kuva-arkit.

ZIP samassa työjuuressa: `juoksupeli-identtinen-928932-delivery-v1.zip`.
SHA256: `420f21bc6a302829238481a9a88eb56545a18f84920b7bd4790b0bf07395a246`.
GLB:t eivät mene gitiin. Postissa ovat raportti, tarkistustiedot ja kuva-arkit.

## Puiden kokeet ja jatkoehdotus

Ensimmäiset tekstistä tehdyt puut tuottivat rikkonaisia kolmiolevyjä. Tein kullekin uuden täyden puun lähdekuvan ja käytin yhden tilauksessa sallitun muotovirheuusinnan. Pagodipuun ja jalavan runko parani, mutta lehvästö jäi isoiksi umpinaisiksi levyiksi eikä vastaa pyöreää latvusta. Neidonhiuspuu epäonnistui myös uusinnassa. Vika näkyy jo Tripossa ja alkuperäisessä GLB:ssä; se ei syntynyt paikallisessa pakkaamisessa.

Kaikissa käytettiin H3.1 / Ultra Mesh, kolmioraja 2000 (eläinrivi 1000), PBR ja Remove Lighting. Alkuperäisissä puumalleissa ei ole alfaleikattua lehtimateriaalia. Paikallisesti tehtiin vain yhtenäinen skaalaus, suunta/origo ja tekstuurien häviötön JPEG-dekoodaus PNG:ksi; ei käsin mallinnusta eikä kevennystä.

**PT: pyydän päätöstä seuraavasta rajatusta menetelmäkokeesta.** Suosittelen yhtä puuta kerrallaan ja selvästi umpinaisista, pyöreistä latvuslohkoista tehtyä lähdettä. Vaihtoehtona on erikseen valtuutettu suuremman lähtöverkon Tripo-koe ja Tripon oma kevennys 2000 kolmioon, mutta sen onnistumista ei ole tässä varmennettu. En käynnistä kolmansia yrityksiä tämän käytetyn erän varjolla. Nykyiset puut pidetään poissa pelistä; 928/929 voidaan tarkistaa nyt erikseen.

## Yhteensopivuus osa B:n kanssa

Kuittaan kuvasession 935-lajisopimuksen ja 933/934-toimituksen commitissa `8d554e5bd45d039519f1f9d125b7bab58e318a9e`. Lajit ovat pagodipuu, jalava ja kesävihreä neidonhiuspuu. Sopimus ja SHA on tarkistettu. Tarkastin 933-v2-kaukolehvästön: sen pyöreät latvat eivät vastaa näitä epäonnistuneita GLB-latvuksia. **Lajisopimus täsmää, lopullinen visuaalinen vastaavuus ei.** Kuvasession omat 933:n varjo-/alfahuomiot säilyvät; 934 on sen mukaan PT-tarkistusvalmis. Osa B:tä ei ole monistettu.

## Kustannukset ja rajat

8 Tripo-generointia, 360 krediittiä; näkyvä saldo 19565 → 19205. Viisi ensiyritystä ja kolme muotovirheuusintaa. Kolme lähdekuvagenerointia; kuvapalvelu ei palauttanut hintaa. Job-ID:t ja lähteiden SHA256:t ovat GENERATION.json:ssa. Kaikki työt on viety talteen; aktiivisia generointeja ei jää.

Remove Lighting ei yksin todista täysin valotonta värikarttaa. Kattokoristeissa on vielä syvennysten tummuutta; vastaanottajan pitää tarkistaa lasitteen valovaste ja normaali-/roughness-tuonti pelin valossa. Ei peli-integraatiota, R2-vientiä tai omistajan lopullista hyväksyntää.

Raskasta paikallista renderöintiä ei käynnistetty. Tuoreessa loppumittauksessa sovellusperheen fyysinen muistijalanjälki oli noin 5,5 GiB (työjakson alussa noin 12,0 GiB); tämä ei yksin diagnosoi tai poissulje muistivuotoa. Tuotanto ja esikatselut ovat T7:llä; selaimen omat latausten välitiedostot siirrettiin hash-tarkistuksen jälkeen pois käynnistyslevyltä.
