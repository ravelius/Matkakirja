# Natiivi-UI: luovutus 6.11.2026 klo 08.59 (konteksti 25 %, 7.37)

Täydentää -0750:tä ja -0721:tä: niiden tausta on voimassa, tämä korvaa järjestyksen. Lukulista 7.47 on luettu tällä vuorolla, mutta uusi vuoro lukee sen itse.

## Tila
- Worktree /Users/Shared/Claude/wt/proto-natiivi-ui-vesinimi on nyt haarassa natiivi-ui/kyltti-usva-219, kärki cff6a5ab3 (ajon 382618036 päällä), peili natiivi-backup peili/proto/natiivi-ui/kyltti-usva-219.
- merkki-pinta-219 on ennallaan 245373730:ssa. Molemmat ovat KS:n ajossa 0b4d74011 (cff6a5ab3 tarkistettu git merge-base --is-ancestor). Ei junaan.
- Kartta-testit 659/659 ajettu cff6a5ab3:n sisällöllä. Unityssä se kääntyi KS:n yhteisessä ajossa.

## Tehty tällä vuorolla
1. Ajo 382618036 katsottu täysikoossa (lokit/esikatselu-20261106-081923): Sacré-Cœurin merkki mäen juurella ei leiju, talorivi maassa; Madeleine, Palais Bourbon ja Saint-Sulpice nimi kokonaan. Tuileries puutarhassa m-etu- ja pb-etu-kuvissa. Merkit: 0 odotusta tasauksen jälkeen.
2. Viive: rivit näyttävät jopa 268 s, joten luku ei kelpaa. KK:lle kerrottu, ettei "13,4 s" -lukua viedä omistajalle ennen loppumittausta. Ei tiedossa, onko KK lukenut (viesti oli jonossa).
3. Notre-Damen kyltti usvassa (KS:n pyyntö), minun vikani: MalliKyltit käytti max(peitto, alueen näkyvyys), joka ei tunne mallin usvaa. cff6a5ab3: Horisonttiusva.MallinKylttiNakyvyys seuraa mallin UsvaNyt-arvoa.
   Todennettu kuvalla, ajo 0b4d74011 (lokit/karttaseppa-yhteinen-4-0b4d74011/ss-talot.png): Notre-Dame-kyltti poissa, Sainte-Chapelle pysyy. ss-la.png:ää en avannut, KS kertoo saman.

## SEURAAVAKSI: elävien nimien karsinta Pariisissa (KS 08.5x, koodaamatta)
KS: lähellä olevia nimiä katoaa ajan mittaan, ja se on myös pelaajan vika. KS ei muuttanut koodia ja vei asian tänne.
KS:n havainnot (unity.log, en toistanut itse):
- nd-raja-koe löytää Rue Jacobin, Rue de Bucin ja Quai Voltairen; nd-raja-nyt samalta kameralta antaa kaikille "ei osumia". Keski-ylhäältä samoin Belleville, Ménilmontant, 11. arrondissementti, Faubourg Saint-Antoine. puut-ylhaalta 08.49 näyttää Rue Jacobin ja Quai Voltairen taas.
- Elävät 3200 → täsmälleen 3000 = ElavaEnintaan × 3/4. HUOM: Karsi laukeaa vasta yli 4000:ssa (Nimikerros.cs:1292), joten 3200 on todennäköisesti harva näyte; tarkista.
- Noin 22 000 riviä vaihtui noin 2 minuutissa, noin 20 karsintaa. KS:n arvio, suodatus ei laskettu.

Koodista luettu (0b4d74011):
- Nimikerros.Karsi:1819: karsii kauimmat etäisyydellä kameran ALAPISTEESTÄ (AlapisteenSuunta), ei katseen kohdasta. Säästää merkittavat, suurkaupungit ja tmp-rivit.
- ElavaNimet.Unohda:413: vapauttaa karsittujen lähipalat z11–14 heti ja tyhjentää kaikki palat enintään 30 s:n välein. Kommentti "karsitut ovat kaukana kamerasta, ei kiertoa" tuli Lontoon ja Jyväskylän tapauksesta.

Oletukset, EI TODISTETTU:
- Pariisissa 3000 lähintä nimeä ei kata näkyvää aluetta, jolloin karsinta → haku → karsinta kiertää.
- Alapiste vinouttaa 45°:ssa: kameran alla ja takana säilyy, edessä näkyvää karsitaan.

Järjestys (9.1: vika toistetaan ennen korjausta; 6.16: mitataan ennen korjausta):
1. Lokirivi Karsi-funktioon: Elavia ennen ja jälkeen, karsintarajan etäisyys km alapisteestä ja katseen kohdasta, usvan loppu metreinä. Kaikki omassa haarassa KS:n kärjen päällä, ei omaa ajoa: pyydä KS:ltä seuraavaan yhteiseen ajoon.
2. Korjaus vasta mittauksen jälkeen. Mahdolliset: vertailupiste katseen kohtaan; katto kaupungin mukaan; ei karsita usvan sisältä. Katon nosto maksaa ruutuaikaa: nyt Nimikerros.Lado 8–13 ms ja pitkiä ruutuja 22–32 ms samassa lokissa, joten ruutuaika mitataan mukana.
3. Tarkistus samoilta kameroilta: Rue Jacob, Rue de Buci, Quai Voltaire, Belleville, Ménilmontant nd-raja-nyt/koe ja keski-ylhaalta. KK:n ehto "nimi ei vilku liikkeessä" (-0721) on luultavasti sama asia, mutta sitä ei ole todennettu.

## Yhä avoinna yhteisistä ajoista (-0750)
- Tuileries nd-raja-kuvissa: pyöreä kuva koskettaa Louvren länsikulmaa, kuten -0750 ennusti. KK kelpuutti kokeena 08.15. Ei tehtävää ilman KK:n sanaa.
- Kyltti RANSKA-otsikon ja Liiku-napin alla häipyy, ei vilku: ei vielä kuvassa.
- Aaripisteet 38 × kärkimäärä latauksessa, ja KS:n kysymys Sovita/Lisays eikä Piirretty (KaupunkiPallot:637 ym.): katsomatta.
- Metroasema haalea sc-80:ssä: sama kuin edellisessä ajossa, syytä ei tutkittu.
- Pieni harmaa nappula usvassa Sainte-Chapellen takana (ss-talot.png, täysikoossa noin x 1007, y 222): ei selvitetty, mikä se on. Voi kuulua "ei pieniä malleja" -sanaan (2.215). KS:lle ja PT:lle kerrottu tällä luovutusviestillä.

## Huomiot
- Mittarin viat (kello pysähtyy vasta uudessa ladonnassa, rivikatto 500): ei korjata nyt, KK 08.15. Mitataan lopuksi.
- Pallo saa olla nimen päällä: älä kysy.
- Ei omaa ajoa, ei junaan.
