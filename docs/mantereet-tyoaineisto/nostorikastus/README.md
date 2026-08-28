# Täkynostokorttien rikastus — keskeneräisen erän siirto (28.8.2026)

Checkpoint-tila: v1278 on mainissa, tämä erä (tehtävä: täkynostokorttien
rikastus, pilotti Sofian areena) EI ehtinyt toteutukseen asti. Toteutusta
tekemään käynnistetty agentti keskeytyi ennen ensimmäistäkään muutosta,
joten koodidiffiä ei ole — alla kaikki mitä uusi sessio tarvitsee.

## Omistajan hyväksymät päätökset (kysymyskortti 28.8.2026)

Tausta: omistajan kaappaus Sofian areenakortista — "varsin vajaa ja ei
kovin hieno tuo kuvakaan. Täytyy miettiä, miten näihin saa laadukkaampaa
sisältöä." Kortilla sovittu: loistoaikakuvat + "Lisäksi vähän enemmän
juttua ja sitten muutama valmis kysymys Pululle jatko jutustelua varten".

1. **Kaksi kuvaa.** Kortin pääkuvaksi loistoaikahavainnekuva (sama sarja
   kuin assets/kartat/ihmeet/, lähderivi tyyliin "Matkakirjan
   havainnekuva: kohde loistoaikansa asussa", malli
   js/packs/fokuskohteet-ita.js:732). Nykyinen Commons-valokuva
   pienemmäksi kakkoskuvaksi tekstin alle, rooli "näin se löytyi" —
   CC-attribuutio säilyy. Datamalli: nosto.kuva = pääkuva, uusi
   valinnainen nosto.valokuva = kakkoskuva; kaikki valinnaisia, Kreikan
   nostot toimivat ennallaan.
2. **Laajempi lunastus.** lunastus saa olla myös merkkijonotaulukko
   (kappaleita); Sofian areenalle ~2 kappaletta. Faktapohja valmiina:
   js/packs/fokusvirta-sofia.js täky id 'areena' (VARMA,
   docs/mantereet-tyoaineisto/takyt-sofia.md täky 6). Kertojan
   yleiskieltä, ei puhekieltä.
3. **Valmiskysymykset Pululle.** Uusi valinnainen kenttä
   nosto.kysymykset: 2–3 kysymystä pelaajan äänellä; kortin alaosaan
   napit, napautus sulkee kortin ja lähettää kysymyksen Livialle
   (js/pollo.js kysy-reitti, uusi aihe, EI jatko). EI saa riippua
   VALMISKYSYMYKSET_KAYTOSSA-lipusta (se koskee vain chatin
   avausvalmiskysymyksiä).
4. **Harhaanjohtava kohdenappi pois.** "Katso X kartalla" vain kun
   nosto.kohde on datassa; ankkuri-fallback poistuu NAPILTA (nyt
   areenakortti tarjoaa "Katso Sofian moskeijat kartalla"). Pisteen
   sijoittelu kartalla ennallaan (js/fokusnosto-symbolit.js, ei kosketa).
   Datan avaa-kenttä on kuollutta dataa (moottori ei koskaan lukenut) —
   pois Sofian datasta.

## Kuva

assets/kartat/nostot/nosto-areena-loistoaika.webp on TÄSSÄ commitissa
(1024×683, webp q80, 118 kt). Generoitu gpt-image-2:lla Actions-ajossa
33187190470 (generoi-kuva-api.yml; artifakti "nosto-areena-loistoaika"
tallella 4.9.2026 asti). Kuvaa EI ole vielä kytketty mihinkään: sw.js-
esilataus ja datan kuva-kenttä tehdään erän toteutuksessa. HUOM
.git/info/exclude sisältää rivin "assets" — uudet kuvat vaativat
git add -f.

## Silmätarkistus tekemättä

Generoitua kuvaa ei ole katsottu — tarkista ennen julkaisua että
näkymä vastaa promptia (amfiteatteri katsomosta, krokotiili ja karhu
areenalla, ei tekstiä/vesileimaa/nykyesineitä) ja ettei siinä ole
mitään outoa.

## Avoin jatkopäätös (kortti jäi vastaamatta)

Omistajan idea samana iltana (turkkilaisen kahvin jutun kaappaus): kun
juttu on auki ja Pulun ikkuna avataan, Pulu voisi generoida muutaman
kysymyksen — tai kysymykset voisi generoida etukäteen jutun yhteyteen.
Vaihtoehdot punnittuna: etukäteen juttuihin (kuratoitu laatu, sarjatyö,
liittyy tehtäviin #83/#84) vs runtime-viritys (nykyinen ehdotushaku
js/pollo.js haeEhdotukset kattaa jo avoimen jutun kontekstin — mutta
worker-julkaisu oli 28.8. rikki, ks. pollo-julkaisu.yml whoami-
diagnoosi) vs hybridi. Kysy omistajalta ennen toteutusta.

Toteutettu v1285
