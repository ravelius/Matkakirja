# Päätoimittajan luovutus 12.10.2026 klo 16.5x (konteksti 64 % → oma nollaus; omistaja HEREILLÄ ja aktiivinen)

Session local_cf5b4eca-d914-46dd-b8de-5ed91ed0a0dc. Edellinen: viesti-fable-luovutus-20261012-iltapaiva.md. Keskustelu: /Users/Shared/Claude/keskustelut/Paatoimittaja-2026-10-12-klo-1425-1656.md. Työjonot: scratchpad/tyojonot.md. Kirjattavat: scratchpad/kirjattavat-20261006.md (uudet rivit loppuun 14.3x–14.5x; loppuosa tästä luovutuksesta → kirjaa lokiin).

## 0. OMISTAJAN LINJAT (voimassa)
- KORTIT TAAS (16.2x "Anna kysymys kortit"): päivällä kysymykset AskUserQuestion-kortteina vuoron viimeisenä, reititys ensin; yöllä ei kortteja.
- JUNA 184 KERÄÄ KAIKEN (15.0x "tee kaikki junaan 184. kerron kun se julkaistaan"): EI lukitusta, TF:ää eikä junan web-mergejä ennen kuin omistaja pyytää → NS:lle ja Julkaisijalle sanatarkasti "OMISTAJA PYYSI JULKAISUA". Keskeneräiset kehityslipun taakse. Taustapalvelun vikakorjaukset (worker) ja docs-PR:t saa mergetä.
- ÄÄNISIVUN TEKSTIT-SIVU (14.3x–14.5x): generoimattomat tekstit ylävalikon Tekstit-sivulle, vain ne joista EI ole versiota pelissä; pelissä olevat Arkistoidut-kokoelmaan. Kertojan äänet generoidaan vasta omistajan Hyvä-valinnan jälkeen (PT lukee valinnat jonokierroksella: tools/aanisivu/valinnat.mjs).
- NAPIT LÄPINÄKYVIKSI (14.5x): kaikkien pelien ja linssien napit oletuksena läpinäkyviä (taidehallin ⏸/☰-tyyli). Paperi- ja mittaristonapit ennallaan (PT:n linja).
- UUDET KUVAKKEET CODEXILTA (16.1x "Tilaa Codexilta kaikki mahdollinen tarvittava uusista kuvakkeista peliin"): NUI tilasi 24 kuvaketta (posti 23a88ef42, tyyliviite + määrittely). Kunnes tulevat: palkki ilman kuvaketta.
- ISS-OHJAAMO: Pulu on poistumistie (omistaja 16.4x), ei ☰:tä. Kertavinkki "Napauta Pulua palataksesi" (kortti: kyllä). ISS-jumin korjaus junan 184 mukana (kortti), EI pikakorjausta 183.1.
- Android EI vielä → työlistan odottaviin (arvio 3–5 vk, ensin päivän koekäännös).
- Intron kuvat (16.5x Codexille): 1800-luvun kuvat MUSTAVALKOISINA, ruokakuvat uusiksi aitoina erilaisina tilanteina (SK posti 04dd31aa2 + 12a76cb74, #4488 päivitetty).
- Levy-laatta ilman sanaa "vapaana" (Postivahti). Asemataulu v61: Työn alla ensin + lihavoidut otsikot, työlistassa vain keskeneräiset (valmiit → Valmistuneet), leipäteksti 0,85rem.

## 1. JUNAT
- TF 183 (BUILD 37083563e) sisäinen 15.08, Apple hyväksyi ulkoiset 15.27, 182 vanhennettu. Omistajalle kerrottu.
- JUNA 184 = natiiviseppa/juna-184 (runko 9e10d95de). Sisällä: d3dea2004, 51fd69084, fdce53c2c, cd364de79, 0e050ce92 (pallokisa lipun takana ⊃ NUI e4be60a18). Odottaa kuittausta/kuvia: NUI e608eaaef ISS (vinkki siirrettävä Pulun yläpuolelle + Pulu→taulu→Poistu todennettava → sitten KUITTAA), f11631667 kipin Poistu-vahvistus, a7d52190c Jaa-nappi, bf6d0f805 napit-kuulto oletus, d84cd1552 kysymys päälle, 7f04a240e mittari/hehku/kyltti; NUI 2f4d8ba89 linna-kuulto KUITATTU linnahaaraan (Siirtoseppä 8093b499b); LS1 434b50461 Praha+Lontoo (simu + tšekkiläiset nimet), 47ce13980 lähestymislento, 75762cdf2 taidemuseo julkaistuksi, taidehalli v5b (kuvat ~18.00 → PT tarkistaa → omistajalle; v5 lähetetty 15.5x); LS2 edeaff467 raketti SMAA; NS Kreikka alue-184 5b62bdf9b (kuvapari GRC | FIN tulossa).
- Worker: #4507 (koodiaakkosto), #4509 (eroa), #4513 (pallot + PalloHuone) MERGED. Docs #4510 #4511 #4512 Julkaisijalla (GitHub-häiriö 16.3x hidasti CI:tä).

## 2. TYÖN ALLA
- PALLOKISA (omistaja 15.5x–16.0x): reaaliaikainen (DO+WebSocket, < 0,5 s), kaasu (neliö, 30 % minimi, henkilökohtaiset pullot < 30 %, ilmapallo +15 %), reunahehku vihreä/kulta, 8 väriä (Okabe–Ito) + nimikyltti (LS1 värilliset pallot), Pulun selostus 74 leikettä (#4511 → Tekstit-sivu, odottaa omistajan Hyvä). Arvio ~13 pv. Seuraavaksi LT:n kahden simun kisatesti viiveineen (#4513 deployattu).
- KIPIN PALLOPELIN MUSIIKKI (16.5x): Äänittäjä tekee 6 kappaletta 120 BPM (A: funk/jazz/kone vain basso+rummut+perkussiot; B: samat + torvi-iskut/fillit) → äänisivu "Kipin pallopeli v2" → kerro omistajalle. Vanhat 3 arkistoon (hylätty).
- ÄÄNISIVULLA KUUNNELTAVANA (kerrottu omistajalle 16.4x): raketti v3 + kirjastoehdokkaat, lyhtyhetki, pallokisan äänet. Odottaa omistajan valintaa.
- OLAVINLINNA (184): Siirtoseppä 1911371ed (katse ±30° seuraavaan reittikohteeseen) + lyhty 4eccb3a27 + v48r → botti → askel 0 -arkki PT:lle (keltaiset kohdemerkit) → PT katsoo → LT uusinta 5 (askel 0 + napautuskävely; hiljainen ikkuna). LR v48r → Siirtoseppä omistajan pelikuvat (11 hahmoa v48o | v48r) → PT tarkistaa → omistajalle.
- KEITTIÖ: LS2 v8 uusinta (liekit, LR:n halot v3b, reitti, kuunsäde) → kävelyvideo → PT tarkistaa → omistajalle. v7 EI lähetetty (kartioliekit).
- VUORISTOT: KS:n arvio: z13–15 eivät näy missään nykyisessä näkymässä → 10 Gt:n polttoa EI tehdä (aineisto ajovalmiina T7:llä). Pilotti-3 vain mekanismin todentamiseen. Kysy omistajalta myöhemmin matalasta vuoristonäkymästä, jos aiheellista.
- KS: Budapestin ja Bukarestin kohdekartat + aarre-erien 1–3 kaupunkien kohdekarttojen tarkistus (Kartta-laji). EI Euroopan linnoja (omistaja).
- SK: aarre-erä 4 tekeillä; #4510/#4512 docs; Ritan oopperatalon faktakorjaus-PR; Granadan "yksi torni" vahvistus.
- NUI-jono: ISS-vinkin siirto → raketin opasteet (ISS-linssin kertavinkki + hintalapun 2. rivi "Lähtö Andøyasta, Tromssan läheltä", lasipilleri __paiva ilman harvennusta) → kuvat napeista/mittarista/hehkusta/kyltistä.
- Äänittäjä-jono: kipin musiikki v2 (KIIRE) → shakin äänet (Wien 1873 kahvila).
- LT: juna 183 -savukierros tehty (löydökset reititetty); raketin oikea reitti (Tromssa → Andøya → £500) testaamatta; Olavinlinna 5 odottaa Siirtoseppää; pallokisatesti.
- SHAKKI: SK:n suunnitelma #4504 + Pelikoodarin #4503 ODOTTAA PT:N TARKISTUSTA (luku 9) → yhteenveto + suositus omistajalle (kortti). Tämä on PT:n oma avoin tehtävä.

## 3. KÄYTÄNNÖT
- Cron JONOKIERROS (7,27,47) ja odottajavahdin Monitor luodaan uudelleen (aloitusviesti). Rooleille, jotka ovat idle, viestit mcp__ccd_session_mgmt__send_message (herättää); SendMessage (uds) ei herätä idle-sessiota. Äänittäjän viestit PT:lle ovat pidätettyjä → tulokset list_eventsillä.
- Levy 36 Gi (16.4x). PT poisti 10 vanhentunutta .app-kopiota (14.3x) ja 4 mergettyä worktreetä. proto-3d/lokit 51 Gt: LS1/LS2 siivoavat omansa (Julkaisija pyysi).
- 5 h -raja 70 % (nollautuu 18.30), viikko 36 %.
- Docs-PR: tämä luovutus + Asemataulun työkopio tools/asemataulu/asemataulu.html (v61). Lokikirjaukset (kirjattavat 14.3x–16.5x: TEKSTIT-SIVU, NAPIT LÄPINÄKYVIKSI, KUVAKKEET CODEXILTA, KORTIT TAAS, JUNA 184 KERÄÄ KAIKEN, ISS PULU, INTRON KUVAT) tekemättä → seuraava PT: `node tools/raamattu-kirjaa.mjs` erillisessä docs-PR:ssä.

LISÄYS 16.5x: OMISTAJAN ÄÄNISIVUVALINNAT (luettu valinnat.mjs:llä, molemmat lähetykset 15.39 ja 16.57 olivat lukematta): HYVÄKSYTYT raketti v3 Kirjasto 1/2/3 + jyrinä (Äänittäjä ehdottaa LS2:lle vaiheet), pallokisan kaasupullon poiminta, poltin keski + joutokäynti, voitto, lähtömerkki (→ Pelikoodari), kipin soittolista 7 kpl (viulu 1/2/5/10, harppu 4/8/9 → Pelikoodari). OMISTAJA "nämä kaikki pitää tehdä uudelleen": pallon keräys 1–3, nippu, koko lyhtyhetki → Äänittäjä 2 vaihtoehtoa kustakin (jono: kipin musiikki v2 120 BPM → nämä → shakin äänet). Lue valinnat jokaisella jonokierroksella (tools/aanisivu/valinnat.mjs työpuusta, jossa main; source ~/.zshrc; NODE_USE_ENV_PROXY=1).
