# Lavastajan luovutus 7.11.2026 14.15 — riittää yksin (korvaa -1253)

A = /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/muuri/aukot. Loki: muuri/KORJAUS.md, loppu. Luovutus kontekstin takia (30 %). Natiivi worktree: /Users/Shared/Claude/wt/proto-lavastaja-esto-kivisivu.

## Tila
Muuriaukko ratkaistu kokeella. Syy: käännös karsi Lattia- ja Maailma-varjostimen instanssivariantit (GraphicsSettings m_InstancingStripping 0), koska materiaalit syntyvät ajossa. Mac ei karsi.
Korjaus: 0c3232522, haara lavastaja/muuri-instanssi (a8b873e5d + JuoksuLattiaInstanssi.mat ja JuoksuMaailmaInstanssi.mat, ei lokiriviä). Koe: 3cd80c26a (sama + tilapäinen seinaloki), lokit/linnanrakentaja-seina5-ipad, seinä 4/4. 0c3232522:ta ei ole ajettu sellaisenaan. PT:lle raportoitu, poiminta PT:n päätös. Haarat vain paikallisessa Matkakirja-proto-repossa: push proto-remoteen epäonnistui käyttöoikeuteen.

## Seuraava askel
Odota PT:n sanaa. Lokihaarat lavastaja/seina4-loki ja lavastaja/seina5-instanssi eivät junaan. Ei uutta ajoa ilman PT:n sanaa.

## Avoin
- Raja-x ja raja-x8: punainen laatta friisin edessä vasemmassa yläkulmassa, näkyi jo seina4:ssä; lähde mittaamatta.
- Ei koestettu: botti, muut kamerat ja kaupunginosat, pieni iPad, iPhone, vahti päällä (huippu 4608 Mt, raja 4080), käännöksen koko. Kehysaika karkea: p50 19,3 vs 17,3 ms.
- Kivisivu10:n raja-x:n seinä näyttää tulleen koejuuren mallista; päätelty kuvista, ei mitattu.
- Kivet palaavat junaan JU:n kautta (omistaja 12.09). v127 ei vientiin ilman PT:n sanaa. v115pala ei vientiin.

## Levy
PT:n pyynnöstä: 42 vanhaa koejuurta siirretty T7:lle (proto-arkisto/linnanrakentaja-katot-v125), paikalla linkit. lavastaja-postilaatikko-worktree poistettu; Codex-postiin luo uudelleen: git worktree add --detach /Users/Shared/Claude/wt/lavastaja-postilaatikko origin/claude/postilaatikko.

## Opittua
Lokirivin avain oli aluksi liian karkea ja Camera.main on juoksupelissä null, joten kartiotesti on sillä arvoton. zsh ei pilko muuttujia: skriptit tiedostoon ja sh:lla.
