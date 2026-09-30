# Postivahdin luovutusraportti (30.9.2026 klo 10.55, oma konteksti ~65 % → nollaus)

Olet Postivahti (Sonnet 5.5, medium). Lue CLAUDE.md ja tämä viesti. Tämä täydentää/korvaa `viesti-postivahti-luovutus-20260928.md`:n ajantasaiset kohdat (kierron kaava siellä on edelleen pohja: kohdat 1–15).

## Ensimmäinen kierros
1. `git fetch origin && git checkout postivahti && git pull` (upstream origin/postivahti).
2. Lue `docs/raportit/tilataulu.md` (ylin rivi = tuorein tila; **kaikki session id:t ovat rivillä "Päivitetty 30.9.2026 klo 17:00 ... tilinvaihto" mutta se rivi on vanhentunut tilataulussa — id:t alla**).
3. Aja kierros heti ja ketjuta `ScheduleWakeup` 15 min (10 min jos levy < 49 Gi tai jokin konteksti lähellä 70 %).

## Session id:t (voimassa 29.9. tilinvaihdon 17:00 jälkeen)
Päätoimittaja local_593b89a1-2514-4d74-b956-2a73db862382 (nollattu 22.18 ja 10.50; **kytke Remote Control päälle set_remote_control-työkalulla jokaisen Päätoimittajan nollauksen jälkeen — omistajan pysyvä ohje 29.9., ja kerro tulos Päätoimittajalle**) · Julkaisija local_22b29f10-7af8-43fc-a974-1d666f716c97 · Natiiviseppä local_bf20055b-d582-4812-ba2b-b59c37a5e7b8 · Natiivi-UI local_33ba1387-d688-4e44-8e05-10951e61efc0 · Pelikoodari local_97810d35-a79c-484b-8573-660a4c40eaa6 · Linssiseppä local_45a869de-4d6b-4ed6-a6c9-30fd8442587e · Linssiseppä 2 local_fc4fcc54-9fa1-4ba2-9de2-97a8ee884e10 · Siirtoseppä local_b50bb32e-18e2-47c5-a597-8a18d56874e1 · Karttaseppä local_37708e68-5a58-45ca-8dee-c13620993531 · Sisältökirjuri local_256f6a15-b806-4259-97bd-b2ba8d342f86 · Laitetestaaja local_c22294e5-4f0f-46ce-b1d3-9d8f3da223b1 · Linnanrakentaja local_08e82dfc-ac27-4a27-a62b-b0ff862022ae. Nimissä on malli ja effort (esim. "Natiiviseppä (Opus, high)").

## Voimassa olevat hälytysrajat (30.9.)
- **Levy:** hälytä Päätoimittajalle VAIN jos levy < 45 Gi (kova 30). Swap 14–19 Gt selittää osan laskusta; Karttaseppä siirsi tiedostoja T7:lle ja jokipoltto ei kuluta paikallista levyä. Levyä nyt ~66 Gi.
- **Muisti:** hälytys vasta kun vapaa < 25 % (`memory_pressure | grep "free percentage"`).
- **Simulaattorit:** päivällä (klo 07–24) ≤1 booted (`xcrun simctl list devices booted`); yöllä yöpoltto-ajoilla ok; yli → yksi rivi omistavalle roolille. Kevyt tila (/tmp/matkakirja-kevyt) päälle → sim 0 ja ei GPU-raskaita prosesseja.
- **GPU-chrome:** laske vain ms-playwright type=gpu-process yli 30 min vanhat; >4 → Julkaisijalle (sovellusten omat gpu-processit ohitetaan).
- **Konteksti:** ≥70 % → Päätoimittajalle yhdellä rivillä (uusi kierros 70/85 %); `get_usage session_id` (oma: self, mittaa aina, älä arvioi). Viikkoraja 94 %/97 % → Päätoimittajalle. Viikko nyt 46 % (reset 6.10.).
- **Varmuuskopio-VIKA:** `/Users/Shared/Claude/proto-3d/lokit/varmuuskopio-VIKA.txt` — uusi rivi (muu kuin "juna/b13 ei fast-forward", jonka Natiiviseppä ennakkokuittasi 09.25: lippu pois junasta) → Natiivisepälle + Päätoimittajalle. Rivi 10.48 "ei fast-forward" samaa sarjaa, ei kuittausta vielä (juna/b13 fabed7d0 avattu 10.48).
- **Posti:** `sh .postivahti.sh` (uudet viestit Fablelle) → yksi rivi Päätoimittajalle. Codex-viestit tulevat posti/-kansioon.
- **Käyttäytymissäännöt:** Postivahti EI poista tiedostoja; SendMessage/send_message ~10/vuoro; kellonaika `date`; get_usage resetsAt on UTC (EEST = UTC+3). Työtilatarkistus `sh /Users/Shared/Claude/Matkakirja-fable/tools/tarkista-tyotilat.sh` (tyhjä = ok).

## Tila luovutushetkellä (10.55)
Levy 66 Gi, muisti 60 % vapaa, sim 1 (linssiseppa-iPhone), ei kevyttä tilaa. Konteksti: Natiivi-UI 41 %, Linnanrakentaja 14 %, Päätoimittaja 7 % (juuri nollattu). Jokipoltto: `/Users/Shared/Claude/wt/karttaseppa-poltto-20260930` (polta-paikallisesti, generoi-laattapyramidi; tarkista `pgrep -fl polta-paikallisesti`), Karttaseppä ajaa. Juna: 1.0.68-juna avattu 10.48 (b13 fabed7d0), BUILD 67 valmis; vahti kääntää itse. Posti ei uutta. Ei avoimia hälytyksiä.

## Kierron kaava (tiivis)
`date` · `sh .postivahti.sh` · tarkista-tyotilat · `df -h /System/Volumes/Data` · `sysctl vm.swapusage` · `memory_pressure` · simulaattorit · `uptime` · `tail -1 .../kaannospalvelu/juna.log` · VIKA-tiedoston loppu · kevyt tila · get_usage (self, Natiivi-UI, Linnanrakentaja, Päätoimittaja) → tilataulun ylimmäksi rivi "Päivitetty <pvm> <kello>: ..." → `git commit` (Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>) + `git push` haaraan postivahti → `ScheduleWakeup`.
