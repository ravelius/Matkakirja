# Pelikoodari: luovutus 11.11.2026 klo 13.20 (konteksti 28 %, Raamattu 7.37)

Edellinen: viesti-pelikoodari-luovutus-20261111-1230.md (a1920a7fd). TÄMÄ KORVAA SEN KOHDAN 1; kohdat 2–4 (漱芳斋-kuvat, aja-a2, B1) ennallaan.

## KAMERALAITE PALA 2: VÄLITILA 5be43897b
Haara kameralaite/pala-2, wt /Users/Shared/Claude/wt/proto-pelikoodari-kameralaite. Tehtävänanto: .../keskustelukanava/suunnitelmat/
20261111-kameralaite-pala2-tehtavananto.md. KK:n vastaukset 13.0x (tehtävänannon päätöksiä): (1) S_enn pelaajan näkyvään paikkaan vain
UusiKamera päällä; (2) korkeusraja = min vapaa väliltä s_kam − a … pelaaja + 4 m eteen kulkusuuntaan; (3) katse = jalat + 1,0 m ylös +
kv × (KatseEdessa(t) − 1) / 6 + 1 m suodatetun nopeusvektorin suuntaan (pidetään, kun vauhti < 0,3); (4) peliin tultaessa Leikkaa ruudun
lopulliseen kirjoitettuun asentoon, Fov-tavoite = vapaan kameran kenttä (KujaKenttaan(..., 1)); (5) y = ikkunan lattioiden kolmiokeskiarvo + H;
sisäinen 1/120-askellus ok; s_kam:n vauhti saa rajata nollaan (rajattu; mittari VauhtiMin).

TEHTY: Seurantaohjaaja.cs (Linssit/Ydin/Kamera: ISeurantaYmparisto, SeurantaAsetus, SeurantaMittarit; jälki renkaassa, kolmioikkuna tarkkana
integraalina, nopeus samasta lausekkeesta derivoituna, työntö hilan 0,5 m kaksoislineaarisesta seinä- ja kattokentästä), JuoksuSeurantaKamera.cs
(Scripts/Juoksupeli, PUHDAS C#: Kartta(tunniste, 4 R-kyselyä) z → −z, Aloita, Askel, Lopeta, Mittaa(t, asento, massassa, piilossa, uusi) kerran
sekunnissa ja Kierros(syy) lokiin Kameratarkastuksella, sama mittari vanhalle ja uudelle), testit SeurantaohjaajaTestit.cs T01–T13
(+ T00 kartoitus vain KARTOITUS=1), kaanna.sh:iin sovitin (testi 13; rajauksen ulkopuolinen yksi rivi, kerro KK:lle valmiissa).
KameralaiteTestit T12 nousuehto toisella kierroksella (13/13).

TULOS: alkuarvoilla 6/14 (T00 mukana), τ_v 0,5 / T_e 1,0:lla 10/14. Mittaukset ja ehdotukset lähetetty KK:lle 13.2x (A–E):
A pysähdys/lähtö/kompastus vaatii τ_v 0,5 (→ D juoksussa 8,5 m myös käytävässä, D_min-kysymys), B käännös seinästä 0,25 m ja pelaaja 18–25°
sivussa (raja 13,5° kuvasuhteella 0,75), C kaistanvaihto rulla 2,5° / katse 12,5° (katseen ennakko nopeusvektorista; ehdotus jäljen suuntainen),
D korkeus ok ehdotuksella, E ruutunopeus 3,1–5,3 cm (SYY TUTKIMATTA: tutki ensin; epäily ruudun sisäinen lineaarinen syöte pysähdysruudussa
+ laitteen taaksepäin ekstrapolointi). ODOTA KK:n vastaus A–C ennen arvojen muuttamista (oletukset yhä KK:n alkuarvot).

TEKEMÄTTÄ (suunnitelma, rajaus ≤ 30 riviä):
- JuoksuV4Maailma: `public static bool UusiKamera; public float Jaannos;` + `readonly JuoksuSeurantaKamera seuranta = new(Debug.Log)`.
  Rivi ~1052: `float sEnn = UusiKamera ? Mathf.Min(s.S + Mathf.Max(0f, s.Nopeus) * Jaannos, r.Pituus) : s.S; Jaannos = 0f;` ja PisteKaarella(sEnn, ...).
  Lohkossa ~2697 (vapaaOhjaa laskettu): uusiOhjaa = UusiKamera && vapaaOhjaa; seuranta.Kartta(r.Kartta, r.Kartta.KuljettavaR, LattiaR,
  VapaaKorkeusR, SeinaEtR); jalat = U(r.Piste(sEnn, s.Sivu)); ensimmäisellä ruudulla merkitse aloitus (asento lasketaan vanhalla tavalla ja
  rivillä ~2738 seuranta.Aloita(asento, jalat, (kulku.x, 0, −kulku.z), s.Nopeus, kentta)); muuten asento = seuranta.Askel(jalat, kentta, dt)
  ja hx/hy/hz/kp siitä; !uusiOhjaa && seuranta.Ohjaa → Lopeta + Kierros. Mittaa pelin ajan molemmilla kameroilla lopullisesta asennosta
  (KameraMassassa, sokkeloMaailma.PelaajaPiilossa(P, pohja + up)); uudella kameralla myös KameraMassassaNyt/PelaajaPiilossaNyt lopullisesta.
  kentta = DroneNosto.KujaKenttaan(aspekti > 1 ? VaakaKentta : YhtPystyKentta, 1f).
- JuoksupeliNakyma: ennen rivin 1409 Piirraa `if (maailma is JuoksuV4Maailma jv) jv.Jaannos = saanto.Ohi || Tauolla ? 0f : kertyma;`
  ja komentolohkoon `case "kamera" when o.Length >= 2 && (o[1] == "uusi" || o[1] == "vanha")`.
- Todiste Macilla (sama botti, rata, siemen; 60 s kummastakin + 3 × 10 s), ei iPadia.

## LISÄYS 13.2x (PT, KK 13.0x, kärki Tekninen kunto): JONOON v133c:n jälkeen
"Kohdekartta: kuvahaut ilman kattoa": NS:n löydös – Esilataajan Nakyva-taso ohittaa kuuden katon; KohdekarttaNakyma.cs:237 ja
NostotKartalla.cs:2991 (Kuvat.Hae → Taso.Nakyva) voivat laukaista kohdekartan avauksessa monta kuvahakua kerralla. Ei mitattu.
Järjestys: ensin toisto Macilla rajoitetulla nopeudella, sitten korjausehdotus KK:lle ENNEN koodia. Tiedot
/Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/latausjono/vastaus-ii.md. v133c ensin loppuun (luovutus -1230 kohta 2).

## LISÄYS 13.3x: v133c 漱芳斋-ovi, PT:n tilaus (ENSIMMÄINEN TYÖ, ennen palaa 2)
JU:n kuvat 13.14: /Users/Shared/Claude/proto-3d/lokit/tarkastelukuvat-a0eaa2d8b-131210 (yhteenveto: asettuminen kesken 0, takapinta enintään 0,091).
PT ei antanut pt-ok:ta: kuvissa ovi on yksin aukiolla ja harjakoristeet leijuvat. LAV:n selvitys: rakennukset ovat v133c:ssä (lod0 eheä,
2544 → 2540 m²). Kauko-kamera (−103; 6; 476) on eteläisen rakennuksen (x −115…−95, z 473…489) SISÄLLÄ, joten häivytys piilottaa rakennukset;
irralliset koristesolmut eivät häivy (KK:lle huomio, ei korjata nyt). Ovi z 490 on etelärakennuksen ja pohjoisen salin (z 494…511) välisellä
reunuksella, EI seinässä → vastaa PT:n kysymykseen (b) kuvien kanssa.
TEE: uusi koekuvat-tiedosto (tyokalut/koekuvat-ovi-shufangzhai.txt mallina), kamera AUKIOLLA rakennusten ulkopuolella niin, että ovi ja
katot näkyvät (esim. idästä x ≈ −85 välikköä pitkin länteen; tarkista kehys tiedostosta), ja sama kohta v132:lla (sha junasta) → JU ajaa
tarkastelu_kuvat.sh → katso kuvat → pari PT:lle, kopio LAV:lle. MR vasta PT:n pt-ok:lla.

Ei agentteja käynnissä. Ei uusia lupia.
