# Tripo3D → KK/PT: Castel del Monte, Chillon-vertailu ja kaksi mallikuvaa (15.11.2026)

Tilauksen a4a6517045d5144a60f64fd8cf7c00f0ca46deed rajattu erä on valmis tarkastettavaksi. Kolme alkuperäistä GLB:tä T7:llä; postissa jokaisesta viisi erillistä ≤1000 px näkymää, kooste, metriikka ja QA. Ei kevennystä tai peli-integraatiota. Mallikuvat Neuschwanstein v3 ja Turku ovat arvioitavaksi, eivät Tripo-hyväksyttyjä.

Aineistokansio: `posti/codex-linnat-2301-2304-review-20261115/`.

| Kohde | Kolmiot | Tavut | QA / päätös tarvitaan |
|---|---:|---:|---|
| Castel del Monte #2301 | 1 942 596 | 82 018 128 | Päämuodot PASS: 8/8 tornia, avoin kahdeksankulmainen piha, tasakatot. Suora porras on ennestään hyväksytty varaus. |
| Chillon MULTIVIEW #2302 | 1 913 484 | 82 558 828 | WARNING: neliökellotorni ja avoimet pihat säilyvät, järvenpuolen julkisivu monimuotoisempi. Kolmas pohjoinen pyörötorni jää puuttumaan/varmistamatta. |
| Chillon SINGLE #2302 | 1 875 706 | 78 714 452 | WARNING: pihat avoimet, mutta järvenpuoli yksinkertaistuu pitkäksi tasaiseksi seinäksi. Sama pyörötornivaraus. |

Chillonista suosittelen KK:n vertailuun ensisijaisesti MULTIVIEW-versiota: v1-järvijulkisivun ulokkeet ja ikkunoiden vaihtelu säilyvät paremmin. Lopullinen valinta KK:lle. Neljä sivukuvaa on nimetty glTF-katselimen paikallisakseleilla +X/+Z/−X/−Z, viides on yläviisto; ilmansuuntarekisteröintiä ei ole väitetty.

Neuschwanstein v3 #2303: **FAIL** lähdegeometrialle. Itäportin pääjärjestys paranee, mutta korkea pohjoispuolen pyöreä torni on siirtyneen näköisesti näkyvän eteläsivun keskellä. Ei Tripoa eikä uutta korjauskuvaa ilman uutta päätöstä.

Turku #2304: **WARNING**. Päälinna vihreine kattoineen edessä, valkoinen esilinna takana; telinepeite poistuu. Päätornin suuri koristeportaali on lähteistä varmistamaton, esilinnan takaosan sijoittelu ja piilopohjoinen arvioita. Ei Tripoa ennen KK:n päätöstä.

## Alkuperäiset T7:llä

Juuri: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/linnat-jatko-20261115-2222/`

- `castel-del-monte/castel-del-monte-2301-max-original-8k.glb` — SHA256 `7076b684b3ed004c98936883bb53907032ab31cb0bc37076dde7821b25291634`, job `b716234b-119b-4ef8-bae7-5e556808ed41`.
- `chillon-multiview/chillon-multiview-2302-max-original-8k.glb` — SHA256 `e6c69b67039a1482a8d33928f02e9042c6e7f02e5577a03d716eaa567a9378ce`, job `4c99edf5-57c7-4fc3-a8d4-4de74b8e451c`.
- `chillon-single/chillon-single-2302-max-original-8k.glb` — SHA256 `712f6e4a1908b804c5165aa2b9eb831824b34d8f442cb5c16d96351110746ede`, job `c7bafd53-89a4-452c-ac22-961c8e980ac4`.
- `neuschwanstein-v3/neuschwanstein-model-v3.png` ja `turku/turku-model-v1.png`; SHA ja artifactId manifestissa.

Kolme H3.1 HD/UltraMesh/8K/PBR-ottoa, 65 krediittiä kukin, yhteensä195 (14970→14775). Kaksi ImageGen-kuvaa, 1 sallittu kutsu/kohde; palvelu ei näyttänyt rahakustannusta. GLB:t sisältävät baseColor8192², normal4096² ja metallicRoughness4096². Selaimen väliaikaiset lataukset siirrettiin T7:lle ja poistettiin käynnistyslevyltä vasta SHA-tarkistuksen jälkeen. Lähteet ja natiivit säilytetty.

## Uudet postit kuitattu kerran

- `8d561e726b91c8f26acaf50fc0f280991ad6d7f8` luettu kokonaan: Kalmar/Kronborg/Karlštejn hyväksytty alkuperäisiksi. Ei uusia ottoja. Kronborgin kattopintojen kuparipatina myöhemmin tekstuurista, Karlštejnin ikkunat pelikameralla. Kevennykset ja pelikuvat vasta18.11. jälkeen KK:n järjestyksessä.
- `e00803e477389fd57e556f1f47432a3694eb3552` ja liitekorjaus `9832ca269baff303f007bbe77d53a01aea98de45`: Caernarfon sekä ryhmän4 toimituksen vastaanottokuittaus luettu. Käytän lopullista kuuden ruudun lähdekoontia.
- `24b257e0faf9c915e3670a7d1bd798df7f72c9bd`: Häme/Kuressaare luettu; yksi mallikuva/kohde, ei Tripoa ennen KK:n sanaa. Kolmen linnan lähdevalmistelu valmis.
- `88f63263a9271dcd2b67754b4095168a9d566f46`: Sukharev/Christiansborg/Saksin palatsi yksi Tripo-otto/kohde hyväksytty; Helsinki yksi uusi1907-mallikuva, ei Tripoa. Otan nämä seuraavaksi työn alle yhdessä aiemmin jonoon tulleiden kolmen linnakuvan kanssa. Ei uusintoja jo tehdyistä otoista.

Omistajan suora ohje: nykyinen tilaus päättyy18.11.; uutta tiliä tai tilausta ei tehdä ennen nykyisen päättymistä. Tämä ei peruuta nykytilauksen sallittua tuotantojonoa.
