# Natiivi-UI: luovutus 16.10.2026 klo 20.11 (Postivahti: kova raja 35 %)

Natiivi-UI (Opus) → seuraava Natiivi-UI-sessio. Lue tämä; -ilta2 ja vanhemmat on käsitelty. Viestit send_messagella id:llä
(/Users/Shared/Claude/osoitekirja.md); PT:lle ≤ 3 riviä. Proto-remote natiivi-backup. Ennen käännöstä tyokalut/tarkista.sh (0 virhettä).
Ketjut: /Users/Shared/Claude/proto-3d/tyokalut/natiivi-ui-ajot/ketjut-20261016/*.zsh. LEVY: vapaata ~28 Gt (käännösraja 25 Gt!) –
_tyo/natiivi-ui/ enintään 2 uusinta .app-käännöstä; poistettu tänään 5 omaa pushattua worktreetä.

## ENSIMMÄISENÄ: MUSEO-NIMI-197 0048e60e6 → TARKISTA KUVAT → PT + NS (juna 197)
Haara natiivi-ui/museo-nimi-197 (worktree /Users/Shared/Claude/wt/proto-natiivi-ui-museo-nimi-197), kärki 0048e60e6
(⊃ ad43f2fec, a9f77f785, c65d2e66c …). AJOSSA: nimi5-ja-leveys.zsh → ensin museo-nimi5-ketju.zsh 0048e60e6 (out:
_tyo/natiivi-ui/museo-nimi5-ketju.out, lokit todistus-museo-nimi5-{iphone,ipad}-197-*, skenaario sk-museo-nimi5-197.txt), sitten
museo-leveys-ketju.zsh e64ff092a. Jos ketju kuollut: `pgrep -fl nimi5` ja käynnistä uudelleen (nohup zsh <ketju> <sha>).
Tarkista iPhone-kuvista (PT: omistaja ei tarvitse uutta kuvaa, tarkista itse):
- T1 Salon Carré: "Leonardo da Vinci, n. 1483–1494" YHDELLÄ rivillä ja väli kehykseen (omistaja 19.44). T2 La Belle Jardinière (3 riviä)
  ja T3/T4 pitkät nimet: ei kosketa kehystä.
- T6/T7 nimilista: seinällä teoksen yläpuolella, valittu ±1, reunat häivytettyinä, ei teoksen päällä (PT 20.0x hyväksyi suosituksen).
- T8 zoomissa nimi PIILOSSA, T8b palaa (omistaja 20.04 korvaa 19.56:n kohdan 2).
- T9 salikortti ja T10 infokortti lasipohjalla (omistaja 19.56 "liquid glass"); salikyltissä ei viivaa + tyhjää riviä.
Sitten: lasikortin KUVAPARI PT:lle (ennen/jälkeen: omistajan kuva /Users/Shared/Claude/Matkakirja-fable/docs/raportit/kaappaukset/
omistaja-20261016/museo-salikortti-liquid-glass-1956.png vs T9; pari.py) → PT:n ok → SHA NS:lle (local_674b9ec4-e2f3-48e9-a810-a129f20a4f03)
+ rivi PT:lle. PT:lle on jo kerrottu 0048e60e6:n sisältö ja syy (20.1x).

### Mitä haarassa on (tämä sessio)
- ad43f2fec: nimikyltin oikea reuna ☰:n vasemmalle (Vali.M + Nappi.Ohjaus + Vali.M, matalassa 110); V2-kävelyn katse korkean teoksen
  keskipisteen yläpuolelle (MuseoKierros.KatseKohta, KorkeaKeskiY 0,55, KorkeaTaytto 0,64 ennallaan; kamera EI nouse – 0,60 + kameran
  nosto rikkoi oviaukkotestit SK-A-44). SilmaKorkeus katseen kohdasta (12°-testi).
- a9f77f785: OpasMetrolinja.Ikkuna (0 = metro ennallaan; 1 = valittu ±1, ±2 häivytettynä IkkunaReuna 0,3, muut display None; Lahin,
  SormiIndeksi ja viiva vain näkyvistä); MuseoTaulu.PaivitaLista: teos listan kaistalla → ala = kehyksen yläreuna − Vali.M (vähintään
  IkkunaMin 96). Kortit: mk-kortti-kehys--tumma (LasiKortti) kortti/huoneKortti/kohtaKortti → Lasipohja.Luokat; HuoneOtsikko(auki).
- 0048e60e6: MuseoKierros.AutoZoomViive 2,5 s (AjastaAutoZoom/PaivitaAutoOdotus; testit viive 0 + AutoZoomVastaNimenJalkeen);
  PaivitaOtsikonRajaus: nimi piiloon kun ZoomKerroinNyt > 1,02 (ei KehysRajautuu-ehtoa). Linssit 1928/1928.

## SEURAAVAKSI: LEVEÄT TEOKSET JUNA 198 (PT 19.4x, omistajan työlistalla)
Haara natiivi-ui/museo-leveys-198 e64ff092a (worktree wt/proto-natiivi-ui-museo-leveys-198), POHJA c65d2e66c → REBASE museo-nimi-197:n
päälle (konflikti MuseoKierros.cs Katseluasento/IhanneEtaisyys + KorkeaTaytto-kommentti; IhanneEtaisyyteen KorkeaTaytto ennallaan).
Sisältö: pysähdyksen kuvakulma levenee, kun sali rajaa katseluasennon (Laajennus = IhanneEtaisyys / pysähdyksen etäisyys > 1,02, LaajaS
0,4 s pehmeästi), zoomin laskenta NakymaEtaisyydestä; MuseoLeveaTeosTestit (kaikki teokset iPhone/iPad pysty). Mittaus: vain
louvre-inv-3699 (Napoleonin kruunajaiset, Daru) iPhone pysty 1,11 → nyt 0,93. Simu-ajo jonossa nimi5:n jälkeen (sk-museo-leveys-198.txt:
T1 Daru, T2 Salon Carré, T3 Orsay; iPhone + iPad). Rebasen jälkeen uusi käännös. Kuvat PT:lle → NS juna 198.

## SEN JÄLKEEN: LASIPOHJA-TYÖLISTAKOHTA
Lasipohja kaikkialle on jo junassa 193 (2358c4f21) – työlistan tilanne vanhentunut (kerro PT:lle). Auditoinnin (Sonnet) aidot puuttujat:
1) ISS-ohjaamon paneeli .mk-issohjaamo__paneeli (iss-ohjaamo.uss:14, IssOhjaamo.cs:158, tk-teema-tumma läpinäkymätön),
2) Äänet-paneeli .mk-pudotus.mk-aanentasot (Matkakirja.uss:854, Aanentasot.cs, --panel),
3) karttakortin videopelivariantti .mk-nosto--videopeli (nostokortti.uss:61, Nostokortti.cs:490),
4) PuluChat.cs:180 inline backgroundColor saattaa peittää oman lasinsa (tarkista kuvasta). Heikot: KrediititTiivis.cs:214, .mk-minipuluKortti.
Ehdota PT:lle (kysy ennen: UI-POHJAT – sama Luokat-lista, ei uutta tyyliä).

## VALMIS / TILA
- Juna 197: salilista a60097fef junan rungossa (PT vahvisti, NS 5ce850087).
- Juna 197 museo-nimi: odottaa yllä olevaa tarkistusta (omistaja 19.44 "Junaan 197, iPhone korjattuna").

## Opit
- Käännösjono: tapa vanha ketju (pkill -f <ketju> ja "proto-kaanna.sh <sha>") ennen uutta; oma odottaja (until grep) pitää tappaa erikseen.
- Kameran nostaminen pysähdyksessä (KeskiY) siirtää katseluasentoa oviaukkojen yläpuolelle → testit "ei seinän läpi" kaatuvat; käytä katseen suuntaa.
- Auto Zoom saapuessa + nimen häivytys zoomissa = nimi ei näy koskaan; muista viive, jos zoom alkaa automaattisesti.
