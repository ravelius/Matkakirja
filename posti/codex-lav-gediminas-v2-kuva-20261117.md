# Codex → LAV / KK / PT: Gediminas v2 #2550–2552, uusi kuva vertailuun

Yksi kokonaan uusi lähdeohjattu kuva valmistui. Riippumaton Sol/high-tarkastaja vertasi kolme oikeaa lähdekuvaa, vanhan kuvan, uuden originaalin ja arkin ennen tuottajan QA:n lukemista. Tila WARN, ei automaattista hyväksyntää.

- Vanhan leveä kivikumpu on poistunut. Kivijalka seuraa tiilirunkoa ja torni on selvästi hoikempi.
- Kolme kerrosta, kahdeksankulmainen avoin terassi, pyöreä porrastorni, liputtomuus ja salottomuus sekä vaakataso täyttyvät visuaalisesti.
- Osoitettu poikkeama: ilmakuvissa näkyvä lasinen terassin porraskatos puuttuu. Pienet aukot ja pintavauriot ovat säännöllistettyjä.
- Fyysistä korkeus/leveys-suhdetta noin 1,5 ei voi todistaa tästä 2D-projektiosta. Tilauksen 13 × 13 × 20 m ei ole vahvistettu kahdesta riippumattomasta lähteestä. Tämä varaus näkyy arkissa ja QA:ssa.

Arkki: `/Users/Shared/Claude/proto-3d/_valmiit/hyvaksytyt-mallit/gediminas/v2-review-sheet.jpg`
Mallikuva: `/Users/Shared/Claude/proto-3d/_valmiit/hyvaksytyt-mallit/gediminas/v2-review-original.png`
Lähteet, originaali, prompt, loki ja riippumaton QA: `/Users/Shared/Claude/proto-3d/_valmiit/hyvaksytyt-mallit/gediminas/v2-review`

Mallikuva SHA256: `ffee71b412bce391f49eec8cf85d2d6d8bf80fc5b506ba4f9a3dc6e615071c30`
Arkki SHA256: `f57748fcceb4538632a8ed674475c46a8fce8c6cf77d37df47618858bb0ff11f`

Uusi kevyt GLB-mittasuhdetyökalu vahvisti vanhasta GLB:stä korkeus/max-vaakamitta = 0,842. Oletuskorkeudella 20 mallin X/Z-mitat ovat noin 23,75/22,77; nämä ovat skaalattua malligeometriaa, eivät vahvistettuja rakennuksen metrejä. Vanhan GLB:n SHA säilyi 3b21634be5a9bdfb215f201af0d865b7327c59aec17da3a658b0ad0e1c37f233. Työkalu huomioi solmujen muunnokset ja rajat, mutta sisältää jalustan ja akselisuuntauksen vaikutuksen. Se täydentää kuvallista QA:ta; ei anna hyväksyntää. Neljä synteettistä testiä läpäisty.

Kuva tehty yhdellä kutsulla; jobid/kustannus tuntematon, koska työkalu ei palauttanut niitä. Ei uusintaa. Tripo v2 vasta tämän yksilöidyn kuvan KK-sanasta; tarvittaessa mitataan v2-GLB heti latauksen jälkeen. Vanha GLB ja kaikki lähteet säilyvät. Paketti ja Shared-kopiot hash-varmennettu T7:llä.
