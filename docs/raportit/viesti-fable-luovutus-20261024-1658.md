# Päätoimittajan luovutus 24.10.2026 klo 16.58 (konteksti 30 %; tili vvi@vvi.fi)

Id:t: /Users/Shared/Claude/osoitekirja.md. PT local_5df52e10. Edellinen -20261024-1455 (lue vain tämä).
ALOITA: tuotannonohjauksen osio 0, node tools/raamattu-luku.mjs 7.47, luvut 7, 8, 9, 12, 14. OMISTAJA HEREILLÄ, PT:n ikkunassa etänä.
Codex-posti: scratchpad-skripti malli (GIT_INDEX_FILE ensin, read-tree origin/claude/postilaatikko, commit-tree, push).
SendMessage-raja täynnä → käytä mcp__ccd_session_mgmt__send_message session-id:llä.

## 0. KK JUMISSA (omistajan asia)
KK local_6088bfc8 odottaa omistajan korttivastausta klo 15.0x alkaen (todennäköisesti PT:n tuotantoputkikortti, ks. 3). Sovellus ei anna
PT:n pysäyttää eikä laittaa etäkäyttöä päälle odottavalle sessiolle. Omistaja (etänä) ei näe KK:ta: pyysi etäkäyttöä → onnistuu vasta,
kun omistaja vastaa korttiin Macilla tai painaa Stop. Sen jälkeen set_remote_control(KK, true). Siihen asti omistaja puhuu PT:lle suoraan.

## 1. JUNA 210 – videot
Kärki: NS 5a51873aa (= 7222593ba + LR lavastaja/kattoalapinta-210 cc4f70f78: avoimet-v16b + tausta-v19b, molemmat ämpärissä 16.18/16.53).
7222593ba = 41cf0072e (kulma B 9daa36e60 + avaus B 107214c34) + PK ristihäivytys 4de065b4f (ei tummaa ruutua).
PK kuvaa vaaka (toinen käynnistys) + pysty, kun NS kuittaa 5a51873aa vihreäksi. PT MITTAA: kattokolmiot pois pysty 49–52 s (kappale
"v4 sokkelo kk-tausta-1-3 lod0", portin räystäs), leima 2,0–2,2 s, ei välähdystä, ei tekstiä kuvan päällä, ääni. Edelliset versiot:
-kulma-b (sirpaleet + tumma ruutu + 39 s lataus) ja -kulma-b-v2 (sirpaleet). Vasta kun puhdas → omistajalle (vaaka taivaaton = omistajan B).

## 2. JUNA 211 – koko uusi ulkoasu (omistaja 14.55, loki d71c09add mainissa)
Suunnitelma docs/raportit/juoksupeli-identtinen-suunnitelma-20261024.md (LR:n kopio 5562c49d0 ilman junajakoa).
Ämpärissä (LR): tausta-v33, rakennukset-v20, avoimet-v25, muurikate-v10. Valmiit kohdat: 1,2,3,4,7,9,11,12,13,14,6 (chiwen+eläimet), 5
(tiilipäät geometriana + VS:n kourukuvio), 8 ei sovellu (hallien julkisivut paneeleja). JÄLJELLÄ: 10 puut: LR kytkee 933b-kaukokortin;
Codex Tripo-puukoe (pagodipuu ensin, 5ac2612a0) kesken. Codex 928/929/934/933b hyväksytty (5ac2612a0, 030e143fc).
VS: muuripari c palautettu (pelikamera alas, 05 väärä paikka, puuttuvat reunukset, liian kylläinen vyö/taivas) → uusi pari PT:lle
uusimmilla paketeilla + valoatlaksen luku. Keskiluiskan kohokuva ja kevennetyt koristeet tarkistetaan VS:n pelikuvista.
Arvio omistajalle 2–3 pv; venymästä KK:lle heti uusi arvio.

## 3. TUOTANTOPUTKIKYSYMYS (omistaja 14.59)
Vastaus lähetetty KK:lle: putki on (A/B/C/D), puuttuu 14.51-tapa. Suositus: B 3d-ja-kuvat.md uusi kohta 11 "Havainnekuvasta identtiseksi"
+ historiapeli-reseptin taulukkopohja + Raamattu 7.20 yksi lause. Kortti "Kirjataanko sääntö …" KK:lle → todennäköisesti juuri se jumissa
oleva kortti. Kyllä → PT kirjoittaa saman päivän aikana (~1 h).

## 4. MUUT
- VS raketti lyhyt-pysty 80f38467 palautettu: 40 s horisonttiviiva, 58–64 s suora vihreä hehkuraita + Maa ilman valoja. Uusi PT:lle.
- LR: kevennettyjen koristeiden karkeus taustassa tarkistettava pelikuvasta.
- Levy laski 89 → 79 Gi (Postivahti seuraa).
- Asemataulun tyolista.json päivitetty 15.39 (rivit 0, 2, 47, 51); päivitä juna 210 -rivi, kun videot ovat omistajalla.

## 5. Opit
- Blender-esikatselu ei riitä: kattokolmiot löytyivät vasta videosta; ensimmäinen LR-korjaus osui väärään kappaleeseen → PK:n mika-komento
  kappaleen nimeen ensin, sitten korjaus.
- Tilaukseen kuvakulma sanoin ("sivulta, maan tasalta"), muuten Codex tulkitsee kortin yläkuvaksi (933).
