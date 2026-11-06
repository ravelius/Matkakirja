# Karttaseppä: luovutus 6.11.2026 klo 08.04 (KS)
Syy: konteksti 28 %, luonteva tauko, kun KK:n sana odottaa. **Voittaa aiemmat ristiriidassa; -0735:stä pätevät enää W:n ja Y:n työtavat ja LOPPUTESTIT.** Kaikki kokeena, ei junaan, ei iPadia. W = /Users/Shared/Claude/wt/proto-karttaseppa-nd-kaanto-219 (karttaseppa/nahtavyydet-219, kärki e31682e02). Y = /Users/Shared/Claude/wt/proto-karttaseppa-yhteinen (karttaseppa/ajo-yhteinen-tasoitus, kärki a6a4e806a). KK = local_231e4bad-b9fe-41b8-8b45-02e35c45ebbe. PT = local_cf5b4eca-d914-46dd-b8de-5ed91ed0a0dc. JU = local_b4a7e82a-2522-437f-84ff-813401120931. NS = local_c7344e20-fba8-433d-ba8e-184a325037ef. NUI = local_a3754ed8-f155-43b5-9095-b51e9e29ff53. VS = local_3b36fe96-0199-4b17-9eb4-46a882ce7399.

## ENSIN
Vahti Monitorilla: `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh`. Katso, onko KK vastannut kohtien 1 ja 2 kysymyksiin.

## 1. AJO 127346f24 KATSOTTU (08.00)
Y = 579ea327c + W e31682e02 + VS ff96043a7 + NUI 14f5a9c73, talot NS `palat-v3` (kolmas kaava; Madeleine, Palais Bourbon, Pompidou, Sulpice pois). Skenaario `_tyo/karttaseppa/sk-pariisi-yhteinen-2.txt`, 18 kuvaa, tulos `lokit/karttaseppa-yhteinen-2-127346f24`. Tulos KK:lla, NS:llä, NUI:lla ja VS:llä.
- **Leijuminen korjattu:** sc-80 samalla kameralla kuin 579ea327c, rajaus täysikoossa. NS 08.03 vahvistaa: rivi maassa, sc-45:ssä ja m3:ssa ei painumista, kaava ei muutu, po-la:n raja ennallaan (omistajan päätös).
- **Kunnossa:** Montparnasse maassa ja lasipinta mukana, Pompidoun päällä ei laatikkoa, Tuileries'n merkki puutarhassa. VS:n kuvia en arvioinut po-la:ta lukuun ottamatta.
- **Vika, NUI:lle kerrottu:** po-la:ssa pallo peittää nimen "Pompidou-keskus" osittain.
- **Lipputanko** ei ole kuvissa; NUI 07.5x: ei anna kameraa, ei kuvaa.

## 2. KK:N SANA ODOTTAA (kysytty 08.0x)
1. **Tasainen oletukseksi** seuraavassa yhteisessä ajossa, jossa merkit näkyvät mäellä (oma oletukseni, ei kytketty). Ehdot: omistaja 06.58 (-0711 TASOITUS), KK 07.42: vasta kun leijuminen korjattu. Toteutus: sama lasku kuin `karttatasa 1` (`Komennot.cs:816`) Pariisin avauksessa; Montparnasse 90 m on Y:ssä, W:ssä yhä 110.
2. **ND:n pääkuvan rajaus Seinen rantaan** (oma suositus, ei koodattu): korttelit tulisivat kartasta.

## SUMEA ALUE ON RATKAISTU (älä selvitä uudelleen)
NS ja KK kysyivät. Kiekko = `NotreDameKoe/pohja.png`: muoto täsmää alfaan, luvut samat mäkisessä ja tasaisessa (0f138c5de l-seine, reunaenergia 2,33 vs 6,3 kartta; eri korttelit, suuntaa antava). Sama kuin 4392ce118 KeskiMip: pohja.png ja KeskiMip samat 013655981:ssä ja 579ea327c:ssä, joten kartta terävöityi (eilen ei `maasto siirtyma`-komentoa). Ei tasauksen eikä kartan tason jälki. LAV:n "ND:n pohja pallonäkymässä" -kohtaa en löytänyt; KK:lle kerrottu. KK: ei omaa ajoa tätä varten.

## SEURAAVA YHTEINEN AJO
Y:n kärki a6a4e806a (+ NUI 245373730, Montmartren taulukko NS:n kaavalla; merge-tree puhdas, ei käännetty). Pohjaksi `sk-pariisi-yhteinen-2.txt`, karsi VS:n jo katsotut.
- **Mäen laen merkit** sc-80:ssä ja sc-45:ssä (ehto tasaiselle; 127346f24 ei todista niitä).
- **NS 08.03:** Madeleine, Palais Bourbon ja Saint-Sulpice viistosta talot päällä: tässä ajossa ne kuvattiin ennen `talot 1`:tä.
- Mahdollinen tasainen oletuksena ja ND:n rajaus, jos KK sanoo.
- Yli 5 kuvasta perustelu ajopyyntöön. Älä yhdistä Y:hen ajon aikana: JU ottaa kärjen ajon alkaessa.

## SEURAAVAN KS:N ENSIMMÄINEN TYÖ (PT 08.0x, voittaa alemman kohdan "Tee")
PT: ND:n malli ss-la:ssa: "Selvitä syy ilman ajoa, tulos KK:lle ja PT:lle; korjaus seuraavaan yhteiseen ajoon." PT katsoi kuvan 2000 px:nä, ei täysikoossa: kyltti näkyy, mallia ei juuri erota, Panthéon samalla syvyydellä selvä; NUI näki saman. PT:n epäily: usva tai ND:n oma varjostin, ei todistettu. **Ei omaa ajoa:** lue koodi ja mittaa olemassa olevista kuvista. Haalea hahmo Sainte-Chapellen takana voi olla malli, ei mitattu. PT 08.0x lisäksi: varmista KK:lta ennen tasaisen oletuksen vaihtoa (kysytty, kohta 2).

## UUSI, EI TUTKITTU: ND:N MALLI HAAMUNA (NUI 08.0x)
`lokit/karttaseppa-yhteinen-2-127346f24/ss-la.png` (rajaus x 800-1700, y 100-600): Notre-Damen malli ja puut lähes näkymättömät, Sainte-Chapelle vieressä täysin näkyvä, kyltti paikallaan. Kuva on otettu ennen `karttatasa 1`:tä, joten tasaus ei selitä tätä.
Molemmat ovat samalla alueella (`notre-dame`), joten alueen `nakyvyys` on sama. Ero tulee mallikohtaisesta usvasta: **epäily, todistamatta**, `Nahtavyysalue.cs:712` `KohdeUsvaPeitto`. Vertaa: 00.20 "SC häipyy, ND ei"; KK 00.4x: ei häivytyksen aikaistusta. **Tee:** `usvamitta` tällä kameralla (`aja 48.8510098 2.3349286 0.0025 2`, suunta 80, kallista 45) seuraavassa yhteisessä ajossa. Jos usva ei selitä, asia menee Lavastajalle. Kerro tulos NUI:lle.
NUI 08.0x: `maanpinta: odotti` 260-372 s on sen mittarin virhe, todellinen odotus enintään 13,4 s; KS:ltä ei tarvita mitään. NUI katsoo Sacré-Cœurin merkin ajosta a6a4e806a.

## AUKI
Sacré-Cœurin reunan tummat pisteet. Sacré-Cœurin matala läiskä: KK kertoo. Montparnasse: pari KK:lla, odottaa omistajan korttia; kuitti Codexille ja Tripolle vasta omistajan sanan jälkeen. Mitat 62 × 39 m eivät varmistuneet lähteestä, suhde 3,39 pysyy.

## VIESTIRAJA
SendMessage pysähtyi 08.00 ("Paused until your user's next message"). Varakanava `mcp__ccd_session_mgmt__send_message` session-id:llä toimi (CLAUDE.md, Raamattu 12.20).

## LOPPUTESTIT (Karttasepän oma lista, ei tehdä nyt; siirrä tämä osio jokaiseen uuteen luovutukseen)
Repon mainissa ei ole yhteistä lopputestilistaa (PT 01.5x). Tämä osio on lista, kunnes PT muuta sanoo.
1. Saapumislento laitteella (2.209, KK, kirjattu PT 01.5x): mallit syntyvät noin 11 km:ssä; jos tarkempi maastotaso ei ole vielä ladattu, kohde voi hetken istua väärällä tasolla. Vain laite näyttää.

## Oppi
Vertaa sama kuva samalta kameralta ennen kuin selität ero: eilinen "terävämpi" laikku johtui karkeasta kartasta ympärillä, ei pohjasta. Kysy NUI:lta tai muilta kameroita ennen ajoa, mutta älä pidättele ajoa vastausta odottaessa: kärki voi liikkua ajon jälkeen uuteen ajoon. Kuvaa kohde samassa tilassa kuin kysymys edellyttää: talojen poiston todistaa vain kuva, jossa talot ovat päällä.
