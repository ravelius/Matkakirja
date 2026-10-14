# Päätoimittajan luovutus 14.10.2026 klo 10.xx — UUSI RAKENNE: Päätoimittaja (Opus, medium) + Keskustelukanava (Opus, max)

Omistajan päätös 14.10.2026 klo 10.1x (kortti "Kyllä, kun juna 189 on TestFlightissa (Suositus)"): orkestrointi siirtyy omaan sessioonsa.

| Rooli | Sessio | Malli | Tehtävä |
|---|---|---|---|
| **PÄÄTOIMITTAJA** (sinä) | local_74630a27-8c1b-4ac3-9143-538efab8cbcd (ent. Kysymykset), kansio /Users/Shared/Claude/Matkakirja-fable | Opus, medium | roolit, erien jako, kuittaukset (kuvat katsottava), junat, jonokierros, odottajavahti, Asemataulu, Codex-posti, Raamattu/loki (ainoa kirjoittaja) |
| **KESKUSTELUKANAVA** | local_593b89a1-2514-4d74-b956-2a73db862382 (vanha PT-ikkuna) | Opus, max | omistajan keskustelu ja ideointi; omistajan päätökset sinulle sanatarkasti; kysymykset omistajalle KORTTEINA siellä |

- Omistaja puhuu Keskustelukanavalle. Sieltä tulee sinulle ohjeita ja omistajan päätöksiä ("OMISTAJAN PÄÄTÖS … sanatarkasti"). Ne ovat omistajan sanaa: toteuta ja kirjaa.
- Kun tarvitset omistajan päätöstä, lähetä kysymys Keskustelukanavalle (`KYSYMYS <tunnus>`, vaihtoehdot ja suositus ensin). Vastaus tulee takaisin sanatarkasti. Et näytä kortteja itse, joten et jää koskaan odottamaan.
- Omistajalle et kirjoita suoraan. Valmiit asiat, joista hänen kuuluu tietää (TF valmis, pelikuvat hyväksyttäviksi), kerrot Keskustelukanavalle yhdellä rivillä.
- Effort medium. Jos huomaat, että kuvatarkistus vaatii enemmän, sano se Keskustelukanavalle, niin effort nostetaan tasolle high.

## 0. Heti aluksi
1. `set_remote_control self true`.
2. CronCreate `7,27,47 * * * *`: "JONOKIERROS (Päätoimittaja): lue ja toteuta tiedoston /Users/Shared/Claude/Matkakirja-fable/scratchpad/jonokierros-teksti.md kohdat 0–10 sellaisenaan" (Keskustelukanava poistaa omansa).
3. Monitor "python3 -u /Users/Shared/Claude/hooks/odottajat-vahti.py", timeout_ms 1800000, kuvaus "roolit odottavat omistajaa (lupakysely tai kysymys)"; uudelleen joka vanhenemisella.
4. Muisti: MEMORY.md latautuu automaattisesti (sama kansio). Lue fable-tila-20261014-paiva, keskustelukanava-ja-paatoimittaja, julkaisu-vasta-omistajan-pyynnosta ja generointi-vain-omistajan-luvalla.
5. Asemataulu: https://claude.ai/artifact/EekZDPMuAcsjT3awvn4jPb. Kirjoita omat dokumenttisi tiedostoon scratchpad/asemataulu/data/talo/*.json. Asemataulu-sessio (local_5ee4b72f-98c8-45f0-b846-51c5d8ffa972) vie ne, mutta junat jäi tänään viemättä, joten tarkista ja vie tarvittaessa itse (ArtifactData set file_path, if_version).

## 1. Juna 189 — JULKAISUSSA (omistaja 10.05: "Junan voisi julkaista heti, kun on järkevä hetki. Ei tarvitse ajaa testejä.")
NS lukitsi 2e980dd33 (L1 iOS + L2 Mac). Julkaisija: web #4573 #4572 #4571 #4578 #4580 mergetty, #4576 → rebase #4582 (CI), muutosloki #4583 (277 mrk, CI). TF iOS + Mac → ulkoinen Arvioijat-ryhmä. Kun TF valmis → rivi Keskustelukanavalle (omistajalle "TF 189 valmis").

## 2. Juna 190 kertyy (kaikki mahdollinen mukaan, julkaisu vain omistajan pyynnöstä)
- **ISS-suikalebugi** (omistajan kuva docs/raportit/kaappaukset/omistaja-20261014/iss-maapallo-suikaleina-0949.png): PK toisti, raketti → Cupola → poistu 2/2 (proto-3d/lokit/pk-kupoli-v2-20261014/poistu1/). Korjaus kesken.
- **ISS astronauttikuvien AUTO** (omistaja: AUTO kytkee luennan heti, nappi oranssi päällä, luennan aikana vain otsikko, kuva ja maapallo; yksi napautus tuo napit ja Pulun takaisin): NUI.
- **ISS-tekstien äänet etukäteen** (omistaja: "Ne pitää generoida, jos ei ole"): Äänittäjä inventoi. Jos määrä on yli 10 000 merkkiä, kysy omistajalta tarkka leikemäärä ja merkit Keskustelukanavan kautta ennen generointia (Raamattu, MÄÄRÄN PÄÄTTÄÄ OMISTAJA).
- **ISS-kohdevalikko** (omistaja 09.4x): PK logiikka 5bb8cf173 + c75ac4833 (vuodenaika pallonpuoliskon mukaan, enintään 1 500 km kohteet, "Oma sijainti" -rivi), NUI valikko pohjilla → video + arkki.
- **Telakointi**: äänikorjaukset ok (a44a47c4b), mutta asema ja kapseli pimeinä → LS2 valo (päiväpuolelle) → PK uusi arkki.
- **Lontoo kehityskaupungiksi** (LS2 1bd163e51 + 452c7fd04 ilmakehä): EI avata ennen korjauksia: Greenwichin harmaa taso + viirut, Trafalgarin katto 40 %, heikko kultainen korostus, yöajo keskustasta. Sitten Praha (Josefov, Vltavan suorakaide, muotokorostus), sitten Ateena (GLO-30).
- **Museon askeleet kaiullisina** (Äänittäjä → LS1), **sellomusiikki** (odottaa omistajan valintaa äänisivulla), **Pulun kysymykset ISS:ssä** (PK), **saapumisintron kuvat** (SK/NUI).
- **KS**: 44 kohdekarttaa (30 kohteineen, 14 aluekarttana) → PK kytkee SK:n e04–e14-esittelyt.

## 3. Codex (posti: scratchpad/posti-laheta.sh "viesti" tiedosto, ajetaan zsh:lla)
Peking erä 6: 64 pintaa. Ensimmäiset 16 on tarkistettu (b1f9d48d9: 13 ok, 10 ja 13 rajataan, 11 ehdollinen), ja 48 uutta tulossa → tarkista arkki täydellä tarkkuudella ja hyväksy omistajan valtuutuksella ("Voit hyväksyä puolestani").

## 4. Roolien sessiot (send_message id:llä)
Julkaisija local_22b29f10-7af8-43fc-a974-1d666f716c97 · Natiiviseppä local_bf20055b-d582-4812-ba2b-b59c37a5e7b8 · Pelikoodari local_97810d35-a79c-484b-8573-660a4c40eaa6 · Natiivi-UI local_33ba1387-d688-4e44-8e05-10951e61efc0 · Linssiseppä local_45a869de-4d6b-4ed6-a6c9-30fd8442587e · Linssiseppä 2 local_fc4fcc54-9fa1-4ba2-9de2-97a8ee884e10 · Karttaseppä local_37708e68-5a58-45ca-8dee-c13620993531 · Sisältökirjuri local_256f6a15-b806-4259-97bd-b2ba8d342f86 · Äänittäjä local_846757a4-5dce-40d7-b43b-12bfa7008396 · Postivahti local_e6d70b5a-fc8a-430c-a2a2-8c8da7f3fcc7 · Asemataulu local_5ee4b72f-98c8-45f0-b846-51c5d8ffa972 · Laitetestaaja local_c22294e5-4f0f-46ce-b1d3-9d8f3da223b1 · Siirtoseppä local_b50bb32e-18e2-47c5-a597-8a18d56874e1 · Linnanrakentaja local_08e82dfc-ac27-4a27-a62b-b0ff862022ae.
Nollatut tänään: NUI, LS2, PK, Julkaisija, SK. Roolien nollausraja 50 %, ja kaava on jonokierroksen kohdassa 2. Oma nollaus 65 %:ssa: luovutus + aloitusviesti, sitten Postivahti nollaa.

## 5. Opit tänään
- Muutosloki ≤ 280 merkkiä ja enintään 3 lausetta (Julkaisijan työkalu).
- Levy: lokit → NAS `SIIRRA_IKA_H=1.5 siirra-ika.py lokit --vain <nimet>` zsh:ssa `${=L}`-sanajaolla; omat worktreet pois mergen jälkeen.
- Kun rooli nollataan, lähetä clear-käsky vasta, kun sen jono on tyhjä ("LUOVUTUS VALMIS" → clear → list_events 0 viestiä → aloitusviesti).
