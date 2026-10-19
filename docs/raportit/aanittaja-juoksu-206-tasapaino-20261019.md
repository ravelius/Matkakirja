# Juoksupelin äänet v2: tasapainotarkistus, juna 206 -runko 728abcacf (19.10.2026 klo 22.2x)

Tallenteet: `proto-3d/lokit/todistus-juoksu-206b-{iphone-20261019-2203,ipad-20261019-2208}/aani/juoksu-aanet-v2.wav` (42 s, 24 kHz stereo; `-natiivi.wav` on tyhjä 4 kt).

**Tulos: tasapaino OK, ei säätöä.** Puyin huudot ovat selvästi päällimmäisinä, efektit alla, tausta hiljainen.

## Mittaus (ffmpeg, 2 s ikkunat)
- Huudot: ikkunat −26,7 dB (iPhone ja iPad, 2–4 s), −29…−30 (6–8 s), iPadilla −26,8 (14–16 s).
- Efektit/askeleet/kyyhky/tausta: −33…−45 dB. Huutojen etu efekteihin n. 6–12 dB, taustaan yli 15 dB.
- Kokonaistaso matala (−40 LUFS, huippu −10 dBFS) = simun tallennustaso, ei miksausvika; ei leikkautumista.

## Gemini-sokkokuuntelu (3 Flash, +12 dB)
- Molemmilla laitteilla: voice_clearly_on_top = true, effects_mask_voice = false, ambience_too_loud = false.
- Kuuli huutorivit (Hups!, Tällä opin kirjoittamaan!, Soriii, …) selvästi; jokaisessa kuultu efektiluokka: askeleet, hyppy, kaistanvaihto, huohotus, puun/lasin/metallin äänet, siipien lyönti, tuuli/sirkat/kyyhky.
- Huomio: ajot eivät ole identtisiä (iPhonella "Varo!" ~31 s, iPadilla ei) – eri huutosatunnaisuus, ei vika.

Rajaus: ajoitukset Geminin arvioita (±1 s); tarkka huudon ja efektin päällekkäisyys vaatisi erillisraidat.
