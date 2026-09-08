# Siirtoprompti Fablelle — 8.9.2026 ilta (Suomen aikaa)

Kopioi tämä uuden session ensimmäiseksi viestiksi. Edellinen sessio
(Fable, päätoimittaja, session_01MQjFtJfBFzXPt5QRVkmpS1) päättyi
omistajan pyynnöstä resetiin ("tehdään sinulle reset ja jatketaan sitten
näiden tekstien perkaamista").

---

Olet **Fable**, Matkakirja-pelin päätoimittaja (repo ravelius/Matkakirja,
omistaja Sami). Lue ensin CLAUDE.md (ensimmäinen rivi: agentit VAIN
Opus ja Sonnet, parvina saa), docs/roolitus.md ja
js/tyohuone-raamattu.js:n 8.9.2026-merkinnät (uusimmat ylimpänä:
KOKO EUROOPPA KULKEE FOKUSVIRTAPAKKIEN KAUTTA; PULULLA YKSI KUPLA PER
KAUPUNKI; TAUSTAMUSIIKKI HILJEMMALLE JA RATTAAN SAADIN; IHMISEN MATKA:
ETELA-AFRIKKA VAIN KERRAN … AVAUS MUSTASTA; PULUN KAUPUNKITEKSTIT
UUSIKSI; PALLON KAUPUNKIPISTEET VAALEAMMIKSI; PULUN AANI HILJAISEMMAKSI
JA KUPLAT TYHJIKSI; PULUN ALUSTUKSET POIS + MATKAKIRJAN OTSIKKO;
FOKUSKARTAN KOHDEKAUPUNKI; KUVAN SUURENNOS; TIEDELIITTEEN ULKOASU;
PULUN HUUDAHDUS EI KESKEYTA LUKIJAA + KUPLAPINO 8 RIVIIN; LINSSIEN
HAMPURILAINEN; PULU JA KERTOJA EIVAT PUHU PAALLEKKAIN; ISOISAA EI
TUNNISTA 1873-PYSAKILLA; KELAUS SYTYTTAA VALOT; KEKSINTOLINSSIN
YLAPALKKI; KARUSELLI ON AIKASELAIN). Työskentelet itsenäisesti
omistajan ohjeilla; kysymykset AskUserQuestion-kortteina; ajat Suomen
aikaa (UTC+3); promptit koodilohkoina; vastaukset lyhyitä. Luo heti
tunneittainen postikierros-rutiini (edellinen trig_01QX3uDN6Y1LcMeNkrLG72QN
kuuluu vanhaan sessioon — poista se ja luo uusi: fetch claude/postilaatikko,
lue posti/kuvatoimitus.md kärjestä, vastaa posti/fable-vanha.md:n kärkeen,
poimi valmiit agenttityöt ja julkaise, ei salaisuuksia eikä sähköpostia).

## 1. Tila

- **main = v1700** (PR #2172). Päivän julkaisut v1686–v1700: keksintölinssin
  yläpalkki + Aloita alusta + pallon laattasarja f; karusellin
  sormivieritys; pulun nappi tumma linssissä; kelaus sytyttää valot;
  isoisä kaukaa 1873-pysäkillä; pulu ja kertoja eivät puhu päällekkäin
  (yksi puhevuoro js/luenta.js); linssien hampurilaisvalikko
  (js/aikajana-valikko.js); havainnekuva palaa kartan liikkeen loputtua;
  kuplapino auki 8 riviin; kohdekaupunki suurempi pallon lähikuvassa;
  Tiedeliitteen ulkoasu + lyhyt/pitkä kuvatekstit (kuva.lyhyt,
  ilmio.lyhyt, kuvaAito.lyhyt/selite) + suurennoksen yleissääntö
  (js/ui-apurit.js suurennoksenMitat); kaupunkipisteet vaaleammiksi
  (#8c6d4e); pulun alustukset pois + matkakirjan otsikko "Paikka, aika"
  + tunnelmarivi + pulun äänitaso 0,8 + kuplat tyhjiksi uudessa
  kaupungissa; Ihmisen matkan uusi tarina (Blombos pois kertomuksesta),
  yhtenäinen v3-luenta aikaleimoineen ämpärissä
  (aikajana/ihmisen-matka/puhe/ihmisen-matka-kertomus.mp3 +
  kertomus-manifesti.json, Forced Alignment), avaus mustasta ruudusta
  tähtien kautta Afrikkaan sanan "Afrikasta" kohdalla.
- **Haara claude/matkakirja-paatoimitus-u3vejq** on mainin päällä ja siinä
  on JULKAISEMATTA (commitit pushattu): Raamattu-kirjaukset, Vilnan
  kupla, **pulun yksi kupla per kaupunki** (18 kaupunkia, commit
  ed5c0fae; LIVIAN_KAUPUNKILAHTEET ['kommentti'] yksi, Sofia
  [VARATTU,'huudahdus','kommentti',VARATTU,…]). Julkaise v1701:nä yhdessä
  alla olevien agenttitöiden kanssa.
- **Kaksi Opus-agenttia oli kesken resetissä.** Niiden worktreet ja
  haarat (jos ehtivät committoida) ovat repossa: `git worktree list`,
  `git log worktree-agent-<id> -1`. Poimi cherry-pickillä, poista
  worktree (`git worktree unlock`+`remove --force`, `branch -D`):
  1. **Musiikki** (worktree-agent-a9b1d4607db117c16): taustamusiikki liian
     kovalla, rattaan säädin ei vaikuta → yksi kerroin kaikelle musiikille,
     kehittäjän oletus 2 → 1, taso kertojan alle. Jos commit puuttuu, tee
     tehtävä uudestaan Opus-agentilla (kuvaus Raamatussa TAUSTAMUSIIKKI…).
  2. **Kuusi fokusvirtapakkia + Ateena + europe-saapumiset arkistoon**
     (worktree-agent-a7f6fca9966b99ee6): Kreeta, Sisilia, Islanti, Alpit,
     lappi (Rovaniemi), Tromssa saavat pakit Fablen teksteistä
     (/tmp/…/scratchpad/kuusi-pakkia.json ei säily — tekstit ovat myös
     tämän tiedoston liitteessä alla), Ateena uuteen kulkuun (yksi kupla,
     ei maadoitusta), js/packs/europe-saapumiset.js → docs/arkisto/
     "EI ENÄÄ KÄYTÖSSÄ", vartiotesti. Jos commit puuttuu, tee uudestaan.
- Julkaisukaava: `git fetch origin main`; `node tools/uusi-versio.mjs
  "<≤60 merkkiä, ei loppupistettä, ei tähti-sanaa>"`; rules+sw-testit;
  `node tools/build-standalone.mjs`; commit; push; PR (mcp github);
  CI "testit" (curl check-runs); squash-merge expectedHeadSha 40 merkkiä;
  `git checkout -B claude/matkakirja-paatoimitus-u3vejq origin/main &&
  git push --force-with-lease`. Testit: `NODE_USE_ENV_PROXY=1 node --test
  tests/*.test.mjs` taustalle lokiin, until-silmukka lukee EXIT-riviä.

## 2. Kesken / odottaa omistajaa

- **Tekstien perkaus jatkuu** (omistajan sana: "jatketaan sitten näiden
  tekstien perkaamista"): Euroopan matkakirja- ja pulutekstit. Yhteenveto
  omistajalle tehdään skriptillä (scratchpad ei säily): kirjoita uusi
  dumppaus, joka lukee js/packs/fokusvirta-*.js (matkakirja.paikkarivi →
  otsikko + tunnelmarivi, teksti, pollo.huudahdus, pollo.kommentti) ja
  listaa 45 Euroopan kaupunkia (js/packs/europe.js), ilman
  saapumistekstejä/nostoja. Sapluuna pulun kuplalle: ≤95 merkkiä, kaksi
  virkettä, "nyt toisin / yhä ennallaan", ei numeroita, ei vihjeitä
  lehteen. Huudahdus 9 kaupungissa (Sofia, Bukarest, Budapest, Praha,
  Krakova, Pietari, Tampere, Tallinna, Riika).
- **Pulun äänet generoimatta** (omistaja: ei generoida ennen lupaa):
  kaikki muuttuneet kuplat ovat hiljaisia (tiivistevahti). Kun lupa tulee:
  workflow generoi-pulu.yml (ääni yjJ45q8TVCrtMhEKurxY), tekstit ilman
  numeroita. Ihmisen matkan luenta on jo generoitu (v3 + aikaleimat).
  Kuuden uuden pakin ja Ateenan matkakirjaluennat generoimatta
  (generoi-luennat.mjs / assets/audio/puhe-fokus-matkakirja-<id>.mp3 —
  tarkista kaava).
- **Kuvatoimitus** (posti/kuvatoimitus.md kärki yhä 7.9. 13:58 UTC):
  odottaa 1873-pysäkin isoisäkuvia (tilaus 8.9. 08:12 UTC), 16 kaupungin
  nostoja, Nuuk/Anchorage, 20 Ihmisen matkan kuvituskuvaa, 6 kohtaamiskuvaa.
- Session 2 (lehdet-haara claude/lehdet-2026-09-07-ilta, kärki bae5c9bc)
  poimittu; jäljellä Puerto Montt+João Pessoa, São Luís+Ouro Preto,
  Kimberley+Managua; kuvitukset Dili, Alice Springs, Iqaluit, Santa Fe.
- Pieniä avoimia: Ihmisen matkan savuke `savuke-aikajana --linssi
  ihmisen-matka` on vanhentunut (8/18, kertomuskaari); Tiedeliitteen
  havainnekuva-lyhyt tehty, Ihmisen matkan nostoille ei lyhyitä;
  tasokartan (linssin alla) kohdekaupungin lattia tekemättä.

## 3. Liite: kuuden pakin ja Ateenan kaanonitekstit (Fable 8.9.2026)

kreeta — paikkarivi: "Kreeta, huhtikuussa 1873. Lämmintä; vuorilla vielä lunta." Teksti: "Hanian satamassa venetsialainen majakka vartioi turkkilaista kaupunkia, ja kummankin liput ovat haalistuneet samaan väriin. Ratsastin sisämaahan kukkulalle, jonka alla sanotaan olevan vanhan kuninkaan palatsi. Sanotaan, että täällä asui hirviö labyrintissa. Minä näin vain palatsin, jossa on liikaa käytäviä — sen verran kuin kiviä maasta pilkotti. Paimen sanoi, että koko kukkula on onttoa. Uskon häntä enemmän kuin tarua." Pulu: "Se palatsi kaivettiin esiin isoisän jälkeen. Ja vuorilla on yhä lunta keväällä."

sisilia — "Palermo, toukokuussa 1873. Kuumaa; Etna savuaa horisontissa." Teksti: "Torilla kala myydään laulaen, ja kauppias suuttui, kun en osannut laulaa vastaan. Tähän saareen ovat tulleet kreikkalaiset, roomalaiset, arabit, normannit ja espanjalaiset, ja jokainen on jättänyt jotain lautaselle. Sisilia on ollut kaikkien maa eikä kenenkään. Siksi sen keittiö on paras Välimerellä. Sitruunatarhat kasvavat mustassa laavamullassa, ja vuori savuaa niiden yllä kuin ei olisi vielä päättänyt." Pulu: "Etna savuaa yhä, ja sen rinteillä asutaan silti. Torilla lauletaan edelleen."

islanti — "Reykjavik, elokuussa 1873. Tuulista; ei yhtään puuta." Teksti: "Maasta nousee höyryä, vaikka mikään ei pala. Ratsastin päivän Thingvellirin rotkoon, jossa kansa on kokoontunut käräjille ennen kuin Euroopassa oli yhtäkään kuningasta nykyisistä suvuista. Mittasin kuuman lähteen, kunnes lämpömittarini suuttui. Saari, jossa on tulivuoria ja parlamentti. Parlamentti on niistä vanhempi. Kaupungissa on pari sataa taloa ja satama, jonka laivat tuovat puutavaran ja viemät kalan." Pulu: "Kaupunki kasvoi, ja puitakin on istutettu. Geysirin naapuri purkautuu yhä tasaisin välein."

alpit — "Grindelwald, heinäkuussa 1873. Kylmää keskellä kesää; ilmanpuntari korkealla." Teksti: "Vaunut kiipesivät laaksoa ylös niin jyrkästi, että laukkuni liukui lattialle, ja vastarinteeltä alppitorven ääni ylitti koko laakson. Hotellin portaille asti ulottuu jäätikkö, jonka reunalta lapset myyvät jääpaloja englantilaisille. Opas sanoo sen liikkuvan; en nähnyt. Toisella puolen vuoria porataan tunnelia suoraan vuoren läpi, ja miehet sanovat, että juna kulkee siitä ennen kuin heidän lapsensa ovat aikuisia." Pulu: "Jäätikkö on vetäytynyt kauas portailta. Tunneli valmistui, ja sen alla on nyt vielä pidempi."

lappi (Rovaniemi) — "Rovaniemi, syyskuussa 1873. Ensimmäinen ruska; yöllä revontulet." Teksti: "Ajoimme päivän jokea ylös, ja jossain kohtaa metsä madaltui tunturiksi. Kaupan ovella puhuttiin kolmea kieltä, ja kaikki puhuivat kullasta. Ivalojoen kultakaivannoilla yö on niin valoisa, ettei kukaan muista lopettaa — niin kertoi mies, joka oli tullut sieltä tyhjin käsin ja aikoi palata. Poroja kulki tien yli kuin tie ei kuuluisi kenellekään. Yöllä taivas syttyi vihreänä, eikä kukaan paikallinen edes katsonut ylös." Pulu: "Porot kulkevat yhä samoja reittejä. Revontulia tullaan nyt katsomaan kaukaa."

tromssa — "Tromssa, heinäkuussa 1873. Aurinko ei laske; satamassa hylkeenpyytäjiä." Teksti: "Nousin laiturille keskellä kirkasta yötä: kello oli yksi, ja aurinko roikkui vuorten yllä kuin joku olisi unohtanut sammuttaa sen. Satamassa purettiin hylkeennahkoja ja jääkarhuntaljoja laivoista, jotka olivat käyneet Huippuvuorilla. Puodissa kuulee norjaa, suomea ja venäjää samassa lauseessa. Tätä sanotaan Pohjolan Pariisiksi. Kysyin miksi, ja kauppias osoitti hattuaan." Pulu: "Aurinko ei laske vieläkään kesällä. Ja lempinimi Pohjolan Pariisi on yhä käytössä."

ateena (uusi kulku, hyväksytty 8.9. klo 19.10) — "Ateena, heinäkuussa 1873. Seesteistä; ilmanpuntari korkealla." Teksti: "Torilla ei tänään tingitty oliiveista. Siellä puhuttiin miehestä, joka oli löytänyt Troijan kullan. Puoli toria piti häntä valehtelijana, toinen puoli nerona, eikä kukaan ollut nähnyt kultaa omin silmin. Akropolis seisoi kaiken yllä niin kuin olisi kuullut saman jutun ennenkin. Kirjoitan tämän muistiin, koska molemmat puolet voivat olla oikeassa yhtä aikaa." Pulu: "Kulta oli aitoa, mutta ei Troijan kuninkaan. Löytäjän talo Ateenassa on nyt museo."
