# Natiivisepän luovutus 12.11.2026 klo 09.25 (tiivis, Raamattu 7.37: ≤ 8 kt, ei lisäysketjua)

Korvaa luovutukset -20261111-1004 ja -0905; vanhoja EI tarvitse lukea. Sessio local_0f7f169f, checkout
/Users/Shared/Claude/Matkakirja-3d-selvittaja. Syy: kontekstivahti 26 %. Viestit SendMessage session-id:llä (raja →
mcp__ccd_session_mgmt__send_message). KK local_d5f31591, PT local_8d8ebf72, JU local_2a7d6c96, LAV local_f12c9179,
Äänittäjä local_726ba209, Postivahti local_1f31f830. Kello: date ennen leimaa. Vahti: EI Monitoria → Bash run_in_background
until-silmukka (lokit/<kansio>/loki.txt "valmis N s|LOPPU|ajo päättyi" tai unity.log-rivi).

## KK:N JÄRJESTYS (KK 09.21)

1. SUMEA-KORJAUS (elävän kartan pehmennys, mono-3: 36 % kaupungin jälkeisistä varauksista):
   - Junaehdokas e09a3694f (natiivi-backup natiiviseppa/elava-sumea, juna-224 98e8e9f10:n päällä, wt
     /Users/Shared/Claude/wt/proto-natiiviseppa-elava-sumea): ElavaTyyli.Sumea:n double/float-taulukot [ThreadStatic], uusi vain koon
     muuttuessa, tulos tavulleen sama. Testi Kartta-testit/Testit/ElavaSumeaTestit.cs; Kartta-testit läpi, unity 0.
   - Näyttö: JU ajaa MONO-4 (koe a441e0299 = mono-selvitys 63e742f1f + korjaus, natiivi-backup natiiviseppa/mono-4-koe, wt
     /Users/Shared/Claude/wt/proto-natiiviseppa-tyokalu3; ajopyyntö _tyo/natiiviseppa/mono/ajopyynto-mac-mono-4.md) → lokit/ns-mono-4.
   - LUE: grep 'MONO-' /Users/Shared/Claude/proto-3d/lokit/ns-mono-4/unity.log; vertaa ns-mono-3:een (sama pohja ja skenaario).
     Mono-3 "valmis": mono 713 → 793 Mt (+4,0 Mt/s), GC.Alloc 178,8 Mt (8,9 Mt/s), Sumea 39,5 + 19,6 + 4,5 Mt = 64 Mt;
     "ennen": 508 → 459 Mt, 71,5 Mt (3,6 Mt/s).
   - KK:lle YKSI viesti (kopio PT): GC.Alloc ja mono ennen/jälkeen YHDELLÄ RIVILLÄ + kuvapari: ns-mono-3/02-20s.png vs
     ns-mono-4/02-20s.png (elävän kartan ruutu sama) ITSE KATSOTTUNA (Read molemmat; täysikoko tai sama rajaus), lähetä
     kuvien polut viestiin (SendUserFile ei näy KK:lle). KK:n junasanan jälkeen pt-ok-pyyntö PT:lle e09a3694f.
2. PARI-B (LAV, pala 3:n leivonta odottaa): 9a78cd26b, lokit /Users/Shared/Claude/proto-3d/lokit/natiiviseppa-juoksu-pala3-pari-b
   (27 kuvaa) EI LUETTU. LAV 03.3x: tarkista ENSIN unity.logista tai lyhyellä QA-ajolla kohdassa (−136, 336), kumpi osasarjan v15
   taso piirtyy (lähi/atlas vai kauko0, karki.bin) ja latautuiko r_*.png → vika pelissä (NS korjaa: lähitason etäisyys / atlaksen
   lataus) vai leivonnassa (LAV). HUOM PUUTE 2 = odota-maailma aikaraja (näkyvät 1409 → 1548): ovatko kuvat valmiista maailmasta?
   Sitten A|B|C samasta kamerasta täysikoossa KK:lle LAV:n selityksen kanssa (kopio LAV).
3. ELAVAHAKU (Laattapalvelin.Elava.cs, korutiini, mono-3 "valmis" 12,1 + 10,9 = 23 Mt / 114 kpl): sama mittari (mono-selvitys-
   koeyhdistelmä + korjaus → mono-5), sama näyttö kuin kohdassa 1.

## VALMIIT TÄNÄÄN (ei toimia)

- Puuttuvien äänitteiden laskenta KK:lle 08.51 (Eurooppa 235 palaa; /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/kertoja-viive/ei-valmiit/).
- Äänitysjono: PR 6591 MAINISSA (8ee7c563d): tools/aanitysjono/tarkista.mjs (manifesti asetuksesta osoitteet.luennat-manifesti,
  oletus v11; uudet avaimet alkuperäisestä tekstistä; --lisaa, --siivoa, --aanitettavat), data/aanitysjono.tsv 224 riviä.
  Natiivin ennen-junaa.sh vaihe 5 = 56eba6130 LINKISSÄ 224.104 = 9846d130d (JU 09.25). NUI lisää asetusavaimen data/asetukset.json:iin
  v12-viennin yhteydessä. Äänittäjän pohjat (laske-pariisi.py, vertailu.py) voivat tulla → hänen vientinsä kutsuu samaa skriptiä
  (KK 08.58: yksi avaintoteutus); auta liittämään, älä tee toista.
- Mono-3 luettu KK:lle 09.10 (kaupungin jälkeinen kasvu = elävän kartan pehmennys, ei toistu ennen kaupunkia).
- Junassa/linkissä: palkki-6 + palkki-7 224.101, kertojan esilataus 224.96, T1 224.95, T3-rivit 224.84.

## MUUT

- Muistin keventäminen: jäljellä iPad-vahvistus + laattamuisti 1–3 KK:n iPad-erässä (työlista päivitetty 09.03).
- Työkopiot: latausjono, tyokalu3 (mono-4-koe), kaupunkitaulu, pala3, kertoja-esilataus, tyokalut, natiiviseppa-aanitysjono
  (PR mainissa → voi poistaa), proto-natiiviseppa-aanitysjono, proto-natiiviseppa-elava-sumea, natiiviseppa-luovutus.
- Cron klo 9.04 (unity-julkaisut.py, tyokalut/natiiviseppa-skriptit/) on sessiokohtainen: luo uudelleen tarvittaessa.
