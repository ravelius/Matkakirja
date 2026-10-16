# Keskustelukanava → Codex: Pekingin parannukset omistajan pyynnöstä (16.10.2026 klo 08.4x)

Omistaja 16.10.2026 klo 08.2x, sanatarkasti: "Miten codexin Pekinginiä saisi parannettua. Pinnat toistavat isoina alueina liikaa
itseään ainakin mutta mitä muuta? Voit välittää sitten palautteesi myös codexille suoraan."

Arvio perustuu Valosepän uusimpiin lentotesteihin (v3 p340i ja v4 p344v4 klo 13 ja 18), V5-saumapakettiin ja v4-GLB:ihin.
Kuvat: `posti/kk-codex-peking-palaute-20261016/peking-v3-vs-v4-klo13.jpg` (vasen v3, oikea v4) ja `p340i-klo18-ion-seinamat.jpg`.
Massat, sijainnit, korkeudet, Taihedianin etuterassi, tiilityypit, kulmatornit, muurit ja vallihauta ovat hyviä. Nyt tarvitaan
elävyyttä, valoa ja vaihtelua. Omistajan tavoite on edelleen, että lopputulos on aivan loistava.

## Kolme tärkeintä (järjestyksessä)

1. **Kontaktivarjot ja syvyys.** Kaupunki näyttää pienoismallilta, koska taloissa ei ole tummumaa juurissa eikä räystäiden alla.
   v4-GLB:issä ei ole COLOR_0:aa eikä occlusionTexturea, vaikka pelin OmaMalli-varjostin tukee molempia. Leivo AO: muurien,
   terassien ja hallien juurelle tummuma maahan, ja räystäiden alle sekä terassitasojen alareunoihin COLOR_0-tummuma.
   (Pelin heittovarjot ovat pois päältä pelin puolella. Valoseppä hoitaa ne erikseen, joten tämä ei odota niitä.)
2. **Pintojen toisto (omistajan havainto).** Värikartat ovat 256 px, ja pihakiveys toistuu 4,8 m:n välein, pelkästään laatassa
   2_3 noin 8 000 kertaa. Lentokorkeudelta siitä syntyy moiré-kuvio. Koko kaupungissa on yksi materiaali pintatyyppiä kohti.
   Korjaus: laattakohtainen uniikki maaleivonta (LOD0 noin 0,25 m/px, LOD1 ja LOD2 pienempinä). Jokaiselle pihalle oma
   kiveyksen suunta ja sävy, keisarillinen keskikäytävä ja sivukäytävät erottuvina kaistoina, kulumapolut porteilta halleille
   ja reunojen tummuma. Isoille yhtenäisille pinnoille (katot, muurit, maa) makrovaihtelumaski tai stokastinen laatoitus,
   jottei mikään kuvio toistu näkyvästi.
3. **Sävyvaihtelu ja kuluma.** Kaikki katot ovat samaa oranssinkeltaista ja muurit samaa punaista, ja punaisia on kaksi eri sävyä
   (noin 131,30,17 ja 157,61,44).
   - Katot: rakennuskohtainen sävy ±5–8 %, 4–8 kattovarianttia (pöly, eri tiilierät, tummuma räystäillä) ja karheus
     (lasite kiiltävämpi, saumat mattapintaiset).
   - Punaiset: sävyt yhtenäisiksi, ja niihin valumajäljet, alaosan lika ja auringon haalistama yläosa.

## Muut korjaukset tärkeysjärjestyksessä

4. **Marmori** on kermankeltaista ja ylivalottuu (noin 245,222,181). Tee siitä viileän valkoista, lisää tumma varjoviiva tasojen
   alle ja lohikäärmekourujen pisterivit.
5. **Kolmiportainen terassi** on palatsin tunnusmerkki ilmasta katsottuna, mutta nyt se katkeaa. Taihedianin takana piha on 0 m:n
   tasolla, ja Zhonghedian ja Baohedian seisovat omilla jalustoillaan. Tee yhtenäinen 土-muotoinen terassi (noin 230 × 130 m,
   noin 8 m). Lisäksi Taimiaon kahdella takahallilla on harmaa katto, vaikka oikeasti ne ovat keltaisia.
6. **Vesi ja Ion-seinät.** Ion on 5–16 m oman maan yläpuolella, joten sen kylki näkyy maskin reunoilla ja vesirei'issä
   (esim. Kultaisen veden joki, kuva p340i-klo18). Tee vesialtaat omaan maahan reunakivineen. Valoseppä laskee pelin veden
   omalle tasolle, jolloin kulmatornit heijastuvat siitä. Reunaverho tulee vain uloimmalle rajalle.
7. **Saumat.** Keskiakseli osuu täsmälleen laattarajalle (116,3908°), joten akselin sommitelma jakautuu kahdelle LOD-tasolle.
   Siirrä ruudukkoa noin 275 m. V5-saumakorjaus menee lentotestiin Valosepälle.
8. **Hutongien kaksoiskuva.** Omat matalat talot näkyvät Ionin valokuvatalojen seassa (v4, vallihaudan takana). Joko oma maa
   ja maski laajenevat (vallihauta, Jingshan, Taimiao), tai matalat omat talot poistetaan Ion-alueelta. Sovi raja Valosepän kanssa.
9. **Taustan nykytalot** näkyvät v4:ssä valkoisina, tasaisina laatikoina. Lämmitä ja tummenna niitä (kuten aiemmin sovittiin),
   ja lisää ikkunarivien ja kattokoneiden vaihtelua, jotta palatsi pysyy kuvan kirkkaimpana.
10. **Puut.** Tee 2–3 lajia: tummat sypressit ja männyt sekä riippapajut vallihaudalle. Satunnaista koko, kierto ja sävy.
    Vaakatasoiset lehtikortit näkyvät ylhäältä kiekkoina, joten poista ne.
11. **Myöhemmin mittakaava:** pieniä ihmisryhmiä keskiakselille ja aukiolle, koska ilman niitä koko on vaikea hahmottaa.

## Pelin puolella (Valoseppä, tiedoksi)
Pelin puolella hoidetaan omien mallien heittovarjot (nyt pois, Natiiviseppä mittaa kustannuksen), vakiotesti kultaiseen tuntiin,
heijastusluotain lasitetuille katoille, lämmin heijastusvalo maasta (varjopuolen punainen ei saa muuttua purppuraksi),
vahvempi ilmaperspektiivi 1,5–2 km:stä alkaen ja Ionin piilotus laajennetun oman maan alta.

Järjestys ja paketointi sinun harkintasi mukaan. Toimitukset samaan tapaan kuin ennenkin Valosepälle, joka lentotestaa ne
ja lähettää kuvaparit. Peking pysyy pelissä piilotettuna vain omistajalle.
