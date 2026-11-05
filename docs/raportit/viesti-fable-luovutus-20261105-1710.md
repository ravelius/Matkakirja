# PT:n luovutus 5.11.2026 klo 17.10 (tilinvaihto päätilille)

Edellinen: viesti-fable-luovutus-20261105-1605.md (sen Opit ja roolien taustat voimassa; muu korvattu tällä).
Siirtoprompti: viesti-fable-siirtoprompti-20261105.md.

## TILI
- Vanha: sami.reivinen@vvi.fi (koodaustili), viikko 96 % klo 17.03. Uusi: päätili, org f04011ee.
- Päätilin raja 92 % (omistaja 17.06, Raamattu 12.21). Viikkokäyttö on lukematta: get_usage heti. vvi@vvi.fi vapautuu pe 6.11. klo 07.00, ja seuraava vaihto on sinne.
- AVOIN RISKI: ~/.claude/CLAUDE.md tuntee KK:n id:n vain tileille sami.reivinen ja vvi. Jos päätilin KK:n id on eri, KK pyytää omistajalta lisäyksen omalla viestillään. Ilman sitä roolit eivät tunnista OMISTAJAN PÄÄTÖS -viestejä. PT ei muuta CLAUDE.md:tä.

## OMISTAJAN PÄÄTÖKSET 16.10–17.06 (2.210, 2.215 ja 12.21 mainissa tai tässä PR:ssä)
- 16.10 Eiffelin malli ilman kolmatta kierrosta. Lintuparvet jäävät Pariisin kartalle.
- 16.41 "jää ennalleen ja edelleen keskitytään vain pariisin 3d rakennuksiin": metsä ennallaan; Pariisin Mac-vuorot ensin Eiffelille ja sarjan seitsemälle, sitten kylteille. VS:n kokeet seis.
- KK: juoksupeli ei pysähdy; Mac VUOROTTELEE juoksupeliä ja Pariisin 3D-rakennuksia.
- KK: neljä katukuvaa ja Invalidit jäävät pieninä kartalle (2.210). Notre-Damen tornien leveneminen ja korkeus ovat tilattua liioittelua, malli ei muutu (2.215). Viittauksia 3.11. 22.11, 4.11. 10.22 ja 11.25 en todentanut lokista.
- 17.05 tilinvaihto nyt. 17.06 päätilin raja 92 %.

## OMAT PÄÄTÖKSENI
- Pientä iPadia ei vielä päivitetty: 2.215 vaatii kallistuksen, uudet kohteet, kyltit ja horisontin nimet kasaan. Kallistus ja horisontti olivat NS:n koehaarassa; en tarkistanut, sisältääkö KS:n 9e8c8ab1e ne. KK voi antaa sanan aiemmin.
- Valovahdin exit 1 (Komennot.cs, Nahtavyysalue.cs, NotreDameKirkko.shader): ei poikkeusta nyt, ratkaistaan ND-kokeen junaanviennissä. NUI:n ilmoituksen varassa; tarkista ennen lukitusta, ettei mikään ole junassa.
- LAV: lattian vaihto kaikkiin 13 palaan, V4_wood-särmiöt pois, kun lähipuu alle 1 m, yksi reunakivi pois. EI VIENTIÄ ennen PT:n sanaa ja PK:n vahvistusta.

## ROOLIT (roolien viestien mukaan; kuvista katsoin itse vain LAV:n yuhua-, ningxiang-, kultapala- ja lattiakoe-parit)
| Rooli | Luovutus | Seuraavaksi |
|---|---|---|
| JU | -1706 d0e50c49e, haara julkaisija-luovutus-20261105-1706 | Jono tyhjä. Ajot: LAV aja13 L1, PK 4c4cf9d8d L2. Vuorottelu yllä. |
| KS | -1706 3d2b2b5cb, haara karttaseppa/luovutus-20261105-1706 | Eiffel 9e8c8ab1e kartalla; Grand Palais otto 2 Codexilla (0ba602a8f), lähteet muille kuudelle. Tornit peruttu. |
| NUI | -1704 5d5c94a72, haara natiivi-ui/luovutus-20261105-1704 | Kyltit 1c5c26667. Auki-kohdat 1–3 KK:n sanalla; Louvren ja Notre-Damen kylttien paikanvaihto; Vrain-Lucas KS:n osa. |
| NS | -1655 bab7451f0, haara natiiviseppa-luovutus-2052 | Lepo. Tyhjä pohja korjattu 379991bd6; katkos ja sumeus auki, ei kokeita. |
| VS | -1645 095fe1068, haara linssiseppa2/luovutus-20261105-1645 | Lepo. Alpit: ehto täyttyy c430bcd40:lla. Ei lukitusta. Laikkujen syy metsä, omistaja: ennallaan. |
| PK | -1706 c372aade5, haara pelikoodari-luovutus-20261105-1706 | Proto 4c4cf9d8d, testit 197/197, katseluajo kesken. |
| LAV | -1706 aa14c1acc, haara lavastaja/luovutus-20261105-1706 | koejuuri-lattia13, aja13 kesken, kuvat katsomatta, saumat ja pari PT:lle. |
| Postivahti | levyllä Matkakirja-posti/docs/raportit/viesti-postivahti-luovutus-20261105-1710.md | Kierrokset lopetettu. Ilmoitti NS:n olevan nollaamassa: tarkista tila. |
| Asemataulu | ei luovutusta | Mittarivika auki (viikko 85 %, levy 129 Gi, kun oikeat 93 % ja 108 Gi); syy ei tullut PT:lle. |

## MUUTA
- Levy 106 Gi. Vanhat PT-scratchpadit (105 kansiota, 421 Mt) siirretty kansioon /Volumes/T7 4TB/Claude-arkisto/pt-scratchpadit-20261105; KK:n ja otsikottomat jäivät. NS:n T7 → NAS -poistolupaa en tarkistanut.
- TF 218:n tarkistus herokuvista JU:lta on yhä vailla vastausta edellisen luovutuksen mukaan; en tarkistanut.
- Haaroja ei poistettu. Worktree scratchpadissa katoaa session mukana: `git worktree prune`.

## OPIT
- Rooli nollautuessa: peruutus sekä suoraan että Postivahdin aloitusviestiin (KS:n tornit menivät muuten läpi).
- Keskitysviestissä tarkista ensin, koskeeko rajaus koko taloa vai yhtä projektia; juoksupeli meni melkein väärin.
- CI-tilaa ei voi päätellä pelkästä CLEAN-tilasta heti pushin jälkeen: tarkista, että tarkistukset ovat näkyvissä.
