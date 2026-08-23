# Vanhat haarat 23.8.2026 (poistettavaksi)

ARKISTOITU TILANNEKUVA 23.8.2026. Tama ei ole ohje eika voimassa oleva
lista, vaan kertaluontoinen kirjaus siita, mitka haarat olivat olemassa
sina paivana. Voimassa oleva lista syntyy aina uudelleen ajamalla
tools/poista-vanhat-haarat.sh.

Repon koko oli kasvanut 2031 Mt:aan (GitHubin suositus 1 Gt). Syy:
dist/matkakirja.html ja dist/matkakirja.partial.html (10,7 Mt kumpikin)
oli committoitu 973 committiin ennen kuin dist/ lisattiin .gitignoreen —
1756 blobia, 10,3 Gt raakana. Mainin omassa historiassa ei ole yhtaan
dist-committia, joten historiaa EI tarvinnut kirjoittaa uusiksi: paisuma
oli kokonaan vanhoissa haaroissa (235 haaraa 241:sta kantoi dist-committeja).

Omistajan paatos 23.8.2026: "Poista vanhat haarat".

POISTOA EI VOITU TEHDA agenttiymparistosta: seka "git push --delete" etta
GitHubin REST-rajapinnan DELETE /git/refs on estetty (proxy vastaa 403
"Write access to this GitHub API path is not permitted through this
proxy"). Poisto tehdaan omalla koneella skriptilla
tools/poista-vanhat-haarat.sh, joka rakentaa saman listan uudelleen
samoilla suojasaannoilla. Tama tiedosto on tilannekuva listasta.

Suojatut: main, claude/julisteet-vienti (herokuvien vientiputki),
claude/matkakirja-middle-east-q7n2v6 (avoin PR #1455),
claude/matkakirja-julisteet-finish-h235w7 (paatoimittajan tyohaara)
seka kaikki haarat joissa on committeja viimeisen neljan vuorokauden ajalta.

| haara | karkicommit |
|---|---|
| claude/aani-matalammaksi | 4850845b |
| claude/aasia-era2-tehtavat | 6ad1d61a |
| claude/aasia-lehdet | 55dc2fa6 |
| claude/afrikan-tahti-expansion-pwfg4x | 107637c6 |
| claude/afrikan-tahti-game-cx5zyz | baa6572a |
| claude/afrikka-erot | 25df3330 |
| claude/aloituskartta | df1eaf66 |
| claude/aloitussivu | 2620615c |
| claude/animaatio-hienosaato | 7fe33b83 |
| claude/ateenan-seutu | 52cfdf2a |
| claude/ateenan-seutu-valmis | eb4be4e8 |
| claude/bahrain-lauta | 6f1778d7 |
| claude/content-world-board-n3u6rq | 5c67e0f1 |
| claude/country-name-page-titles-1uegdu | 50e8bb45 |
| claude/era-d-bahrain | 0501084a |
| claude/era-d-saudi | b8cbb375 |
| claude/era-d-saudi-korjaus | 2d300045 |
| claude/etusivu-animaatio | 5a5286f9 |
| claude/etusivu-viat | b6fd1eb0 |
| claude/etusivun-alareuna | 711901ff |
| claude/eurooppa-etela | c6b3c682 |
| claude/eurooppa-viisi | fe2840cb |
| claude/fable-aarrenakyma | 7c06d288 |
| claude/fable-alapalkki | 579c66ec |
| claude/fable-alareuna-max | f3851290 |
| claude/fable-avatarit | 194caf5d |
| claude/fable-docs-paivitys | d3d11e38 |
| claude/fable-docs-parvilupa | fc641a6a |
| claude/fable-e00-ita | 24025791 |
| claude/fable-e00-lansi | 48ea54be |
| claude/fable-e00-taydennys | fd7a9a03 |
| claude/fable-eka-laatta | ea24acde |
| claude/fable-firenze | d67c2fc1 |
| claude/fable-flickr-aasia | b6c90c98 |
| claude/fable-flickr-lehtikuvat | a142d0af |
| claude/fable-flickr-putki | fae92e88 |
| claude/fable-int-firenze | a4b65247 |
| claude/fable-int-tampere | 9aacf7d5 |
| claude/fable-int-uudet | 39ebe6a6 |
| claude/fable-kairo | c7ed5488 |
| claude/fable-kartta-max2 | a24b45bf |
| claude/fable-kartta-max3 | 1f27035e |
| claude/fable-karttaopaste | a0740a90 |
| claude/fable-karuselli2 | 8139ecd1 |
| claude/fable-karusellivalo | 48d93adf |
| claude/fable-kohteet-e00 | 902910b6 |
| claude/fable-kohteet-eur | 6d95ddcc |
| claude/fable-kuvatesti | cfcb54d9 |
| claude/fable-lehtitila | 875cd17f |
| claude/fable-lippubugit | e6eacfd9 |
| claude/fable-lippukehys | 00bc7737 |
| claude/fable-lukijan-leipa | 73bcbe60 |
| claude/fable-lukijoilta | 905a6ce5 |
| claude/fable-m7a | 1e5c1fda |
| claude/fable-m7b | 742f9882 |
| claude/fable-matkalaukku | 958386d3 |
| claude/fable-max-ateena | 94ef1b3f |
| claude/fable-max-d1 | 70e6717d |
| claude/fable-max-d2 | d915227f |
| claude/fable-max-d3 | d51aab86 |
| claude/fable-max-d4 | ab1626c7 |
| claude/fable-max-d5 | 16ca25e3 |
| claude/fable-max-d6 | c029ba2e |
| claude/fable-max-d7 | 996103e9 |
| claude/fable-max-kaariauditti | b7308f82 |
| claude/fable-max-m0b | 383f0b5e |
| claude/fable-max-m1 | e96d7e00 |
| claude/fable-max-m2 | ff286ab3 |
| claude/fable-max-m3 | b3566b28 |
| claude/fable-max-m4 | 3e4217c4 |
| claude/fable-max-m5a | 03435da0 |
| claude/fable-max-m5b | 2d3e0e34 |
| claude/fable-max-m5c | 3df532f4 |
| claude/fable-max-m6 | ad205886 |
| claude/fable-max-maakyltit | 71b547c4 |
| claude/fable-max-matkakirjat | 80c9d06c |
| claude/fable-max-remontti | a997decd |
| claude/fable-miniat-era12 | a10a1c0d |
| claude/fable-nahtavyysikkuna | c500165b |
| claude/fable-o6 | ea52375c |
| claude/fable-opas-kaiutin | 02da449a |
| claude/fable-opas-saa | 5f8785b1 |
| claude/fable-opasbugit | 6befaaf1 |
| claude/fable-paperi | f19e0c07 |
| claude/fable-pollo-aarre | 877e18f5 |
| claude/fable-pollo-kysymykset | 4484fb04 |
| claude/fable-pollo-yksisivu | a81d9047 |
| claude/fable-pro-palikka | 542b5a73 |
| claude/fable-siirtymaruutu | 1cf500c9 |
| claude/fable-tampere | 78e83afc |
| claude/fable-taustapaluu | f23bce11 |
| claude/fable-tilastolehti | 5e453dfd |
| claude/fable-turhat-linjat | b6799f43 |
| claude/fable-uudet-kaupungit | 94e56a2f |
| claude/fable-varusteruudukko | 85b1030a |
| claude/fable-vuosisaa | 8a1b435d |
| claude/fable-zoomi2 | 0d9e19a0 |
| claude/fable-zoomitarkennus | ef9efa7b |
| claude/ios-aalto-b | e96602ab |
| claude/ios-kuori | fcd2223c |
| claude/ios-laajennus | 6720648d |
| claude/ios-lukija | 5f89bb4b |
| claude/ios-testflight | fc8cdb6c |
| claude/ipad-ambienssi | d9bdf75b |
| claude/kartan-tokkiminen | d096b78b |
| claude/kaupunkitaulut | 8794ef8c |
| claude/kehittajatila-ja-aariviiva | be06d7a8 |
| claude/kiikari-etusivulle | a05b34a7 |
| claude/kiikari-hionta | 48c2bd5f |
| claude/kor-musiikki | 4aa1a331 |
| claude/kuvaduplikaatit | 658b60e2 |
| claude/kuvaukset-aasia | 5118e86b |
| claude/lentokalvo | c34afea0 |
| claude/lisenssikorjaus | 5e52704e |
| claude/majakka-saadot | bd8a7419 |
| claude/manner-zoom | b10fa045 |
| claude/matkakirja-aloitusnakyma | 98844c0b |
| claude/matkakirja-avaus-asettelu | 532dfc14 |
| claude/matkakirja-avoin-ui | c93bb455 |
| claude/matkakirja-game-dev-kk8650 | 2710b9f9 |
| claude/matkakirja-game-dev-la16ae | 993ba566 |
| claude/matkakirja-kartta-aukot | 66cfb606 |
| claude/matkakirja-kartta-kokoruutu | 01c25b6d |
| claude/matkakirja-kevyt-ui | 7c7b9326 |
| claude/matkakirja-koordinaatio-iuho1k | b3e20b91 |
| claude/matkakirja-paketti-3 | f7110395 |
| claude/matkakirja-paketti-4 | 0d74320c |
| claude/matkakirja-paketti-6 | 569a010f |
| claude/matkakirja-paketti-7 | c3d12b4a |
| claude/matkakirja-pallonpuoliskot | 5d608203 |
| claude/matkakirja-peli-kehitys-rtrn23 | 08d49e4c |
| claude/matkakirja-portti | 8cbc4240 |
| claude/matkakirja-puhelinkartta | 46456736 |
| claude/matkakirja-tarina | e75b5f5a |
| claude/matkakirja-vakaa-teksti | 3e9af837 |
| claude/me-lehdet-tasavahvistus | f32538d2 |
| claude/media-peili | 001e6dc0 |
| claude/muistiinpanot | 28060056 |
| claude/nahtavyysselaus | 315fc38e |
| claude/napit-ja-pollo-teravyys | 95d56911 |
| claude/nappi-keskelle | bb0eb9b7 |
| claude/noppa-varjo | d408dd17 |
| claude/opus-me-aasia-lehdet | 75572b3a |
| claude/opus-me-saatiedot | ac0ae547 |
| claude/opus-sijainen-5e3lk5 | 5e43d8d5 |
| claude/opus1-me-lehdet | f74ae5ec |
| claude/opus1-muistiinpanot | 639db5bc |
| claude/opus10-kuvatekstit-era2 | 83dd2736 |
| claude/opus10-kuvatekstit-era3 | da5db40f |
| claude/opus11-zoom | b6c4cba9 |
| claude/opus12-kuvatekstit-e2 | 03f8c9ed |
| claude/opus12-kuvatekstit-e3 | 91691ac8 |
| claude/opus12-kuvatekstit-e5 | 1b9a777c |
| claude/opus13-karttalaajennus | e14bcb72 |
| claude/opus14-kuvatekstit-e4a | bcbb0e38 |
| claude/opus14-kuvatekstit-e4b | f4507ba3 |
| claude/opus15-karttareunus | 6eb06f6e |
| claude/opus16-esipuskuri | 34683635 |
| claude/opus17-nahtavyysjutut | 925677d9 |
| claude/opus18-kobenhavn-nahtavyydet | 59a2a14c |
| claude/opus20-matkailijalle-era1 | ca7db3eb |
| claude/opus21-pariisi-etusivu | dc77bc22 |
| claude/opus22-pariisi-etusivu | 8395e729 |
| claude/opus23-kuvakasikirjoitukset | 77d415c3 |
| claude/opus24-aanet-r2 | e2031b49 |
| claude/opus25-opas2 | a74ba1c1 |
| claude/opus26-opas21 | 2eae0113 |
| claude/opus27-opas22 | 3d2e7f20 |
| claude/opus5-peilityokalu | be02f188 |
| claude/opus5-vuorikuvat | 62d54cf8 |
| claude/opus6-siperia-lehdet | 3dced80f |
| claude/opus7-satelliittikartta | 610aa394 |
| claude/opus8-kuvatekstit | e1415313 |
| claude/opus9-siperia-era3 | dad679ee |
| claude/palautelomake | ce900055 |
| claude/palkki-ikonit | 59a64295 |
| claude/pelidemot-tyohuone | ed4b5da8 |
| claude/periaate-lomake | 0cc99c17 |
| claude/pollo-era2 | 0059c0f1 |
| claude/pollo-era3 | 05a54f20 |
| claude/pollo-julkaisuajo | f0dc9317 |
| claude/pollo-saadot | 1858e1e4 |
| claude/pollo-sijainti | e3913b19 |
| claude/pollo-striimiaanet | 89123fbe |
| claude/pollo-ux-era4 | 3170df49 |
| claude/raportti-erad | 526e2dff |
| claude/safari-korjaus | cef4bdef |
| claude/sumennus-ja-alanapit | cb5fc48e |
| claude/tekijamerkinnat-erad | 65104628 |
| claude/tyolista-jatka-r93q6g | d163314d |
| claude/tyolista-p10 | 040a9a68 |
| claude/tyolista-p11 | 97790f13 |
| claude/tyolista-p12 | 45a2ece9 |
| claude/tyolista-p13 | 404aa89b |
| claude/tyolista-p14 | c98e5ab7 |
| claude/tyolista-p15 | dc884012 |
| claude/tyolista-p16 | 513c8d70 |
| claude/tyolista-p17 | 399d1104 |
| claude/tyolista-p18 | ca66caf6 |
| claude/tyolista-p8 | 3e1d7fea |
| claude/tyolista-p9 | ce766100 |
| claude/valtion-analyysi-lehtisivu-e5s1lw | 9ef19672 |
| claude/viisas-pollo | 96568b03 |
| claude/wiki-kentat | df09e380 |
| claude/zoom-aani | 94b3a45d |
| claude/zoom-aani-2 | 4e44e952 |
| claude/zoom-aani-tasaus | 988083f8 |
| claude/zoom-hionta | f9b5c7b7 |
| claude/zoom-synkka | 3c32c563 |
| julkaisu/ateena-tiivis | 9af4c38c |
| julkaisu/eu-isfahan | 6d60cda3 |
| julkaisu/euro-hionta-1 | 7af6fef5 |
| julkaisu/euro-hionta-2 | fa58f984 |
| julkaisu/euro-hionta-3 | de844af3 |
| julkaisu/eurotekstit-sivu | 094a830b |
| julkaisu/kulkija-passi | 2de5eac8 |
| julkaisu/max-rima-era3 | d492c7f9 |
| julkaisu/max-rima-era4 | 46426035 |
| julkaisu/mysteerikaanon | f66247d2 |
| julkaisu/pikkuseloste | 231bd428 |
| julkaisu/riad-viittaus | 50152757 |
| julkaisu/sonnet-korjauserä | e3e10f62 |
| julkaisu/tilannetaulu-yo | aafa3a3e |
| julkaisu/uusimmat-ylos | 46734155 |
| julkaisu/v558-jalkikorjaus | 2c6fb3c4 |
| julkaisu/vuorigalleriat-era2 | 35f56060 |
| opus-paaaarrekuvat | 31e5a5aa |
| opus3-kohtaamiskuvat | 3730f482 |
| opus3-raportti | 93227d7e |
| opus4-varustekuvat | a19d7980 |
| worktree-agent-a045f97ffa68e9ae0 | 0f5e87e2 |
| worktree-agent-a3e7d2898ba40b99f | dbf59073 |
| worktree-agent-aa6e054745f55757a | aa10dd4e |
