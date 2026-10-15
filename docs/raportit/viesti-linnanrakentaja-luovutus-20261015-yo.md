# Linnanrakentajan luovutus 15.10.2026 klo 22.47 (Linnanrakentaja, Opus) – Postivahdin kova raja 35 %

Edellinen: `viesti-linnanrakentaja-luovutus-20261015-ilta.md`. Viestit AINA id:llä osoitekirjasta `/Users/Shared/Claude/osoitekirja.md`
(PT local_5df52e10…, Postivahti local_a24c43c0…, Valoseppä local_c238f4af…). PT:lle ≤ 3 riviä. OLAVINLINNA TAUOLLA.
OMISTAJAN PÄÄTÖS 15.10. 17.22: uudet 3D-mallit siirtyvät Codexille; Louvre tehdään vielä sinulla VERTAILUKSI. Ei uusia 3D-malleja
Louvren jälkeen ilman PT:tä. Kirjaa jokainen kierros (kello, get_usage self: konteksti + 5 h %, luvut) `_valmiit/louvre-v1/VERTAILU.md`:hen.

## 1. SEURAAVAKSI (PT 22.4x)
1. **Valosepän v2f-pelikuvaparin arvio (kulma B).** PT pyysi parin klo 22.4x; malli on viety 22.46 (k10: KS-albedot, mansardien jyrkät
   lappeet `liuske_t`, tummempi ikkunalasi, k2–k6 LiDAR-korjaukset). Kerro Valosepälle vientiaika ja pyydä paketoimaan sen jälkeen.
   Arvioi pari: kiven sävy pelissä (aiempi tavoite Google ~115,106,109 pelissä; PT hyväksyi hunajanbeigen v2d:ssä), katot, kiveys,
   Cour Carréen sora, lasikatot. Sävyt sovitetaan VAIN pelikuvaparista (T = havaittu / vientialbedo, tavoite = Google / T).
2. **Julkisivujakso kerran huolella ja monistus** (PT 17.23): arvioijan k9-kohta 3 – paviljonkien veistoskoriste ja päätykolmiot
   (Sully, Richelieu, Denon), kattoikkunoiden (lucarnes) kehykset, savupiiput riveinä, alakerran kaarisarjan syvyys. Tavoitteet
   `tavoite/codex/` K1, K4–K7 (K6 = paras lähikuva pihajulkisivuista). Sen jälkeen kierros `kierros.py N --eevee --tavoite codex`
   + tuore Sonnet-arvioija (`tavoite/arvioija.md`, tai k9:n kehote VERTAILU.md:n mukaan: neutraali valo, ohita pyramidi/ympäristö).
3. Pysähdys: rajoissa / 2 kierrosta ilman parannusta / 10. Lopputulos PT:lle (ei välikuvia).

## 2. LOUVREN TAVOITELUUPPI – tila
Kaikki: `/Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/louvre/tavoite/` – **lue sen LUEMINUT.md ja codex/MALLINNUSOHJE.md ensin.**
Malli: `/Users/Shared/Claude/proto-3d/_valmiit/louvre-v1/` (lahde/louvre.py, LUEMINUT.md:n loppu k2–k7, VERTAILU.md = koko kirjanpito).
- Kulmat `louvre-kulmat.json` (7 ilmakulmaa, kaikki 3:2 1536×1024 = Codexin sisäisen kuvatyökalun natiivikoko; K2/K3 vfov 51,8, K5 55,2).
- Muototavoite = LiDAR-maskit `natiivi1536/` (massa.npz, nDSM > 3 m leikkauksen sisällä). Ulkoasutavoite = `codex/` (PT hyväksyi 22.4x):
  K1 = Codex v2 (91,3 %), K4 85,5, K5 90,0, K6 97,1, K7 92,9 %; K2 58,5 ja K3 17,4 % hylätty (`codex-hylatyt/`).
  Codexin tunnetut virheet ohitetaan (K1: Seine takana, Cour Carrée puuttuu; K4: pyöreä allas).
- **Pyramidi EI malliin eikä tavoitteisiin**: omistajan 17.17 "Pyramidi Googlelta" voimassa (PT vahvisti 22.4x; Pei k. 2019, suojattu).
- Luvut nyt (k10): IoU 92–93 % paitsi K7 87,9 % (syy paikantamatta; etelästä Darun yltä), korkeusero 0,6 %, dE ka 8,9, pohja-IoU 90 %.
- Työkalut: `kierros.py N [--ei-vientia] [--eevee] [--tavoite codex|natiivi1536]` (vienti → kuvaus 1536×1024 → vertaa.py → ero/arkki-kN.jpg +
  yhteenveto); `kuvaa_louvre.py` (--lidar/--malli, --koko, --eevee; maskista poistetaan alle 2 m pinnat = kiveys ja Cour Carrée 1,28 m);
  `pohja_malli.py` + `pohjaero.py` (mallin ja LiDARin pohja + korkeudet 20 m ruuduissa – tehokkain muotovirheiden paikannin;
  scipy vain venv-rembg:ssä); `ylin.py` ja `erot_kulma.py` (mikä LiDAR-kohta tekee kulman ylimmän rivin / erot); `iou.py` (maskit).
- Lähteet joka kierrokselta `tavoite/kierrokset/kN/`, edelliset `lahde/louvre.py.ennen-k2…k10`, `.ennen-albedo`.

## 3. Muut
- Codex-posti: worktree `/Users/Shared/Claude/wt/linnanrakentaja-posti` (detached, haara claude/postilaatikko; poista kun Louvre valmis).
  Lähetetty: 8c0fbcdea tilaus, 98c3dcfe4, 89eeaa7fc, 57c6322df, 3d1b5099f, d601cde8f (Louvre kuitattu, Codexilta ei tarvita enempää).
- Valas: hypyn liike/roiske = Valoseppä (ValaanHyppy/RakettiValas), ääni = Pelikoodari (RakettiAanet.Valas); kerrottu PT:lle. Luurankoni
  ValaanLuusto.cs antaa lennossa vain staattisen kaaren. Proto-worktree `/Users/Shared/Claude/wt/proto-linnanrakentaja-valasluuranko`
  (luuranko meni juna 193:een → voi poistaa `tools/uusi-worktree.sh … --poista`-kaavalla).
- KS:n albedotaulukko: `/Volumes/T7 4TB/koodaus/proto-3d/_tyo/karttaseppa/vertailu/euroopan-albedo-luokat.md` (Louvren sarake käytetty k7).

## Opit
- Codexin kuvatyökalu ei pysy kaukaisten korkeiden kulmien (450 m / 280 m) sommittelussa; lähemmät ja pelikulma onnistuvat, kun syötteinä on
  massakuva koko ruudun pohjana + punainen ääriviivaohje + maski. Mittaa IoU aina itse natiivikoossa.
- Workbench-renderi tekee kivestä lähes mustan → sävyarvio vain EEVEE + neutraali päivänvalo (kivi ≈ pelin arvo) tai pelikuvaparista.
- Kuva-arvioija on epätarkka muotovirheissä; pohjakuvavertailu LiDARia vastaan löysi kaikki isot virheet (Colbert/Daru 8 m liian korkeat,
  Richelieun lasikatot 13 m liian matalat, avoin Denonin piha täytetty, Cour Carréen siivet 3–5 m sivussa).
