# Linssisepän luovutus 15.10.2026 klo 18.20 (konteksti 33 %, PT:n raja 30 %)

Proto-git /Users/Shared/Claude/proto-3d/Matkakirja-proto (paikalliset haarat, ei pushia). Työ-worktree wt/proto-linssiseppa-kierrokset195
(haara linssiseppa/kierrokset-195). Ajot proto-3d/tyokalut/linssiseppa-ajot/ (ketju `ajo-<nimi>.zsh`, irrotus perl setsid; Julkaisija antaa
`kaannos-<nimi>.nyt` / `simu-<nimi>.nyt`). Testit `sh Linssit-testit/kaanna.sh [suodatin]`, `zsh tyokalut/tarkista.sh | grep "virheitä yhteensä"`.
Viestit AINA send_message id:llä (/Users/Shared/Claude/osoitekirja.md): PT local_5df52e10-10e4-4b72-9554-0049db300dfe (≤ 3 riviä),
Julkaisija local_5cb16c00-98db-4cd9-8d7c-1b0bc8ced914, NS local_674b9ec4-e2f3-48e9-a810-a129f20a4f03, PK local_7fcab04b-864c-4ec2-98bd-46e171326701,
Valoseppä local_c238f4af-ae73-44e7-81f1-92848acd9217, Postivahti local_a24c43c0-8094-4141-b734-90b9555f5044. Simu iPad 00CF62C2-2FE6-4993-8475-5786CC40A7A3.
SITOVA (PT 18.1x, omistaja 09.36 "Ei testejä junaan"): EI iPad-/simuajoja junaa varten; tarkistus datasta ja automaattitesteillä.

## 1. SEURAAVAKSI: ISS-YÖTAIVAS (PT 18.1x, omistaja 18.10 "Voit alkaa hommiin")
Toimeksianto: /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/iss-yotaivas-20261015.md kohta 2 (Yötaivas).
- Sinulle: asema maan varjossa yöllä (vuorokausivalinta/Live, myös Oma sijainti), sisävalot himmenevät, tähdet + planeetat oikeilla
  paikoillaan (vapaa tähtiluettelo + ratalaskenta), skanneri taivaalle samalla vihreällä kehyksellä (~20 kohdetta v1: Kuu, 5 planeettaa,
  kirkkaimmat tähdet, Otava, Orion, Seulaset, Linnunrata, Andromeda, Orionin sumu), teleobjektiivilähennys, Pulun kesäyön opetushetki.
  Tekstit Sisältökirjuri, revontulet Valoseppä, sijaintikartta Natiivi-UI. ISS-koodi: koordinoi PK:n kanssa (17.52-palautteen korjaukset ensin hänellä).
  UI-POHJAT. PT haluaa SUUNNITELMAN 3 RIVILLÄ ennen isoa koodia – EI vielä lähetetty.
- Nykyiset tiedostot: Linssit/Unity/KyydinTaivas.cs, Tahtitaivas.cs, TaivasNayttamo.cs, TaivasPaneeli.cs, CupolaKerros.cs; Ydin/Iss/IssKyyti.cs
  (varjolaskenta: grep "Varjossa\|maan varjo"). Ota haara juna-195:n kärjestä (tools: uusi worktree proto-gitissä kuten kierrokset195).
- Valoseppä ehdotti rajapintaa (HYVÄKSYTTY 18.2x, luvattu julkinen `KyydinTaivas.Varjossa` float 0…1, 1 = kokonaan varjossa – toteuta): sinun tiedostosi KyydinTaivas*, KyydinTahdet/KyydinKuu-varjostimet,
  taivasskanneri, sisävalojen himmennys, opetushetki; hänen Revontulet.cs + Revontulet*.shader, Ilmakaari/Ilmakeha2 (yöhehku), kupolin punainen
  hehku; kumpikaan ei muokkaa toisen tiedostoja. Piirto: tähdet/Kuu Transparent-60, revontulet −36 additiivisina. Hän pyytää julkista
  `KyydinTaivas.Varjossa` (0…1) kupolin hehkuun; tarjoaa `Revontulet.Nykyinen` (voimakkuus + suunta) skanneriin. Hänen haaransa
  valoseppa/revontulet-196 (juna-195 e9fba547b). 

## 2. VALMIIT TÄNÄÄN (kaikki PT:n kuittaamia junaan 195 ellei toisin mainita)
- f0a07ccb1 DTM-korostus + historia pysähdyksen lopussa; 66c5be330 Ateena v10 (kulmat195); e9a5f5d84 metrolista pysyy historian ajan
  (vain historian soidessa, omistajan 7.10. lähtösääntö pysyy); 6cea52597 historialento kaaressa (HistoriaLentoRho 0,7).
- 93c146524 Ateena v11 (kertojan kulku: v10 venytti lennot 61/36 s → stadion ilman katse_suuntaa, Tuulten torni v9-arvoihin; testivahti
  lento ≤ 35 s, poikkeukset Akropolis 53,5 s ja Greenwich 44,4 s) – PT:lle ilmoitettu, kuittaus odottaa.
- Ateena v12 = PELIKOODARIN edb351a43 (pelikoodari/ateena-v12, 93c146524:n päällä; Zeus silmä 75–90; ämpärissä 18.16, PT: voimassa).
  Oma rinnakkainen 08ac5caee hylätty (sama data, vain versioteksti eri; ei v13:a). kierrokset195-haara siirretty edb351a43:een.
- Praha pysyy v6:ssa (Josefovin 45/90 rikkoivat 15 s:n liukurajan). Hylätty v7-paketti: proto-3d/_tyo/linssiseppa/hylatyt/.
- Historiaosioiden kuvat (404 Prahalle, Ateenalle, Lontoolle, Kööpenhaminalle) → PT antoi Sisältökirjurille; koodi lukee ne heti.
- Arvio historia195-arkista: proto-3d/_tyo/linssiseppa/historia195-arvio-20261015.md.
- Orpo museokohdat6-recordVideo (pid 26437, 19 h) pysäytetty 18.1x, simu vapaa; PT:lle kuitattu.

## 3. MUUT
- NS:n löydös (PT 18.2x, pieni, ENNEN yötaivasta): AstronauttiLinssiTestit.CupolanEnnakkoOnAvautuvaAsento kaatui kerran (e9fba547b) –
  oikea kello ylitti päivä/yö-rajan 20 s:n ennakossa. Korjaus: kiinteä kello testiin (tai yö-tarkistus myös e20-hetkelle).
- Hefaistos → Akropolis -lento 53,5 s (vanha, ei käännöstä; KS:n maanpinta v3 7a16a11d0 korjaa Propylaian korostuksen – katso, lyheneekö).
- Worktreet: historia194 (poista kun juna-194 julkaistu), kierrokset195 (työ, = edb351a43), puutomat191 (pysäköity).
- tools/gpu-vapaa.sh ja .claude/settings.local.json* checkoutissa eivät ole minun (älä committaa).

## ALOITUSVIESTI SEURAAJALLE
Olet Linssiseppä (Opus, high). Lue CLAUDE.md ja tämä luovutus (git show <sha>:docs/raportit/viesti-linssiseppa-luovutus-20261015-1820.md).
Korjaa ensin NS:n testilöydös (kohta 3), sitten ISS-yötaivas (AVOIN ERÄ, kohta 1): lue toimeksianto ja nykyinen taivaskoodi, lähetä PT:lle suunnitelma 3 rivillä ennen koodia (PK:n kanssa ISS-koodista sovittava).
