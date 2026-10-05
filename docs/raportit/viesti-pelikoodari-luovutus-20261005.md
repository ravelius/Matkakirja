# Pelikoodarin luovutus 5.10.2026 klo 06.0x (viikkokiintiö 97 %, tilinvaihto ~07.15)

## Tila: kaikki erät valmiit, ei avoimia worktreitä
- **Juna 142 (proto, BUILD 142 62d5d1bb masterissa):** pelikoodari/lukija-aanet 1fbbad7b
  - Nostokortin lukijaäänet: ElevenLabsin tili/malli/worker kunnossa (24/24 ääntä 200 suoraan ja workerin kautta).
    Juurisyy sovelluksessa: valittu ääni tuli voimaan vasta seuraavasta palasta → `KortinLukija.AaniVaihtui` aloittaa
    soivan palan heti uudella äänellä (Eleven-generointi ~5 s).
  - Moottori/Ääni ilman ponnahduslistaa: ‹ › + arvo kelausnappipohjilla, lista paneeliin kappalerivipohjilla
    (Päätoimittajan hyväksymä 4.10. 23.3x). Ohinapautus: Laitetestaajan oikeat napautukset 1–5 OK.
  - Kuvat: ≥ 1 Mt → ImageIO pitkä sivu ≤ 2732 px (Gatewayn isot kuvat ~83 → ~28 Mt; #3966:n pakollinen osa).
  - Kohdekaupungin kuvakortti (Kutsuminiatyyri): herokuva kiinnitetty LRU:lta, uusinta 5/15/45 s.
  - Testikomennot: `ui lukijaaani eleven|xai [n]`, `ui lukijavalinta Ääni|Moottori [avaa|+|-|n]`,
    `ui kuvat hae|nayta <url>`, `ui napautaklik x y`; palalokissa x-puhe-moottori.
  - Todisteet: `/Users/Shared/Claude/proto-3d/lokit/pelikoodari-juna142-todiste/` (TODISTE.md).
- **Juna 140 (BUILD 140):** Pelit-kategoria kartan Linssit-napin alle (Linssivalitsin.Pelit.cs), pelit pois Aarteista.
- **Web (main):** #3960 astro-ehdokastyökalu (tools/astronaut/ehdokkaat.mjs, gateway.mjs; arkit
  proto-3d/lokit/astro-ehdokkaat/2026-10-04), #3961 ISS-kohdevalikko 30 lähintä (v2610), #3975 Tavlin äänet +
  hakulistan tuplakarsinta, #3978 Myllyn lisä-äänet.
- **Äänet Siirtosepälle (kytkee UI-vaiheessa, vienti Julkaisijan vie-paketti.sh:lla pyynnöstä):**
  `proto-3d/_valmiit/tavli-aanet-vienti-20261005/` (8) ja `_valmiit/mylly-lisaaanet-vienti-20261005/` (4); CC0 WAV,
  huippu −6 dBFS, isku ≤ 1 ms; ämpärissä aanet/tehosteet/tavli/ ja mylly-v3/.

## Avoimet / huomiot
- Gateway-hakujärjestys: VALMIS, PR #3983 mainissa (images-api ensin, Gateway varalla; gatewayTunnus ilman etunollaa).
- Lopetus 99 %:ssa (Päätoimittaja): ei avoimia eriä eikä worktreitä; Pelikoodari levossa seuraavaan erään.
- Freesoundin alkuperäiset häviöttömät vaativat OAuthin → lähteenä esikuuntelu-mp3; jos Siirtoseppä raportoi
  pehmeän iskun, vaihda Kenneyn Casino Audion dice-throw-*.ogg:hen.

## Opit (tältä yöltä)
- Simupaneelin lupaa ("Let Claude use it") ei ole → oikeat sormikosketukset Laitetestaajalla; `ui napauta` ei kelpaa
  ohinapautuksen todisteeksi.
- Simussa kertoja pois: `puhe paalle` ennen `puhe lue`. Puheen kaappaus = Unityn `kaappaa <s> <nimi>` → `<nimi>.wav`
  (natiivi-wav sisältää vain AVAudioEnginen silmukat).
- ÄLÄ pushaa junassa olevaan PR-haaraan (tein 01.3x #3975:een; Julkaisija hyväksyi). Uusi erä = uusi haara.
- tools/uusi-worktree.sh epäonnistuu hiljaa, jos samanniminen paikallinen haara on olemassa → tarkista `pwd` ennen gitiä.
