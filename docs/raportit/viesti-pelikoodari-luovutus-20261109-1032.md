# Pelikoodari: luovutus 09.11.2026 klo 10.32

Korvaa kaikki aiemmat. Nollaus kontekstivahdista (pehmeä raja 25 %). Edellinen: `git show origin/pelikoodari-luovutus-20261109-1016:docs/raportit/viesti-pelikoodari-luovutus-20261109-1016.md`.
Työpuu /Users/Shared/Claude/wt/proto-pelikoodari-juoksu (remote natiivi-backup), NYT haaralla pelikoodari/juoksu-223-suunta (kärki 1ceb5e35e).

## 1. OMISTAJAN PÄÄTÖS 10.03: juoksupelin uusi alku "Kelpaa", viat korjataan ennen junaa
Haara pelikoodari/juoksu-223-suunta = junan 223 kärki 4e972eeed + 7 committia, kärki 1ceb5e35e. unity-tarkistus (sh) 0 virhettä.
- Korjaus 1, iPhone pystyn kierto f6824ffc2: KELPAA, kuvat katsottu (keisari kokonaan kuvassa ruuduilla 1560–1780, pää ~50 px reunasta).
  Valmis-rivi PT:lle 10.20. Arkit: proto-3d/lokit/pk-suunta-iphone-f6824ffc2/arkki-*.jpg.
- Korjaus 2, ohjekaista renkaiden väliin: 06d003a24 EI OSUNUT vaa'assa (ei yhtään "ohjekaista"-lokiriviä, laatikko renkaiden alla).
  Uusi toteutus 1ceb5e35e: laatikon ja renkaiden worldBound; rajaus vain, jos väli < pohjan USS-raja 544. Ensimmäinen näkyvä mittaus
  kirjataan aina: "MATKAKIRJA juoksupeli: ohjekaista … (laatikko y …, rengas y … ±70, renkaat v/o …, kaista …, väli …)".
- 9c3f179ed: Esikatselu.cs oleta-seur (haku edellisen oleta-osuman jälkeen). Syy: vaa'assa PuyiHuutaa tuli lokiin d1-kuvan aikana →
  oleta-uusi ei nähnyt → PUUTE-ketju. sk-suunta-vasemmalle.txt käyttää nyt oleta-seur 120 (OviAukeaa yhä oleta-uusi).
- JU:n ajo AY 1ceb5e35e: iphone-vaaka → ipad → lokit/pk-suunta-{iphone-vaaka,ipad}-1ceb5e35e.
- TEE: (a) PUUTE-rivit 0? (b) unity.log "ohjekaista" – vaa'assa "renkaiden väliin N pt", e-ohjaus/e2: teksti renkaiden välissä
  rivittyneenä, ei renkaan alla; (c) iPad: kaista ei muutu tai muuttuu järkevästi (luku lokista); (d) vaa'an kierto/kuvat kuten pysty.
  Kelpaa → kuvat VAIN PT:lle, valmis-rivi PT:lle (haara + 1ceb5e35e + kuvien polut). Ei osu → mittausrivin luvuista syy.
  Huom: junaan poimitaan myös 9c3f179ed (vain editori) – mainitse PT:lle.

## 2. Kattokaistale (PT 08.3x; korjataan ennen junaa) – TUNNISTUS KESKEN
- kaistale3 (lokit/pk-kaistale3-iphone-764e5c329, JU 10.26): kaikissa 8 pisteessä KOLMIO = vain "v4 palatsi korttipuut keskipuut -1 2"
  (31–32 m, osuma 9,6–10,0 m, kortin yläreuna 10,06 m, läpinäkyvä kohta), takana idantuija ja Pohjapallo. INSTANSSIT (0) kaikissa
  → EI GPU-instanssi. Muut listan rivit ovat vain rajauslaatikoita (muurikate 0, kk-tausta lod0), kolmio-osumaa ei.
- Poissuljettu: JuoksuSokkeloMaailma.cs:757 Graphics.RenderMesh = Lammita (0,001 m, vain 6 ensiruutua). Varjostimessa ei kärkisiirtoa
  korttipuille (vain räystäspalkki 2 cm). Korttipuuatlas puut-933b-1024 on alfakuva → wrapMode Clamp (JuoksuV4Maailma.cs:869), joten
  toistovuoto ei selitä. UV: u-sarakkeet sisennetty 0,005, v ei (JuoksuKaukopuut.Kortti: v 0 ylhäällä, 1 alhaalla).
- Kuvassa (c-ovi): ohut kelta-oranssi tiiliraita x 0,71 → oikea reuna, y 0,284, puurivin yläpuolella; sama c2:ssa; d1:ssä liikkuu puiden mukana.
- Ajossa JU:lla (AY:n jälkeen): kaistale4 = 764e5c329 iphone, sk-kattokaistale4.txt (korttipuut 0) → lokit/pk-kaistale4-iphone-764e5c329.
- TEE: kaistale katoaa korttipuut 0:lla → korttipuu syyllinen: tarkista atlaksen sisältö kortin yläreunassa (pura puut-933b-1024 glb:stä,
  rivit v 0–0,05 kolmessa sarakkeessa) ja mip-tasot; korjaus esim. v-sisennys yläreunaan (Kortti: v 0 → ~0,01) tai alfaraja.
  Ei katoa → seuraava epäilty taivas (taivas-codex-v3 palat, JuoksuV4Maailma.TaivasPalat.cs) tai muu ilman Rendereriä; pyydä sk:hon
  taivaan QA-kytkin, jos sellainen on (grep "taivas" JuoksupeliNakyma.cs QA-komennot).

## 3. Muuta
- Työlista: rivi "Juoksupeli: uusi alku, korjaukset ennen junaa" päivitetty 10.28.
- Vanha jono (luovutus 0922 kohdat 2–3 ja aiemmat) ennallaan.
