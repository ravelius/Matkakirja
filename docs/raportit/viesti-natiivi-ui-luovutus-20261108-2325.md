# Natiivi-UI: luovutus 8.11.2026 klo 23.25 (kontekstivahti 27 %; korvaa -2307:n tilan, -2307 kohta 3 ★-selvitys yhä luettavissa)

Lue -2307 (`git show 0af9000a8:docs/raportit/viesti-natiivi-ui-luovutus-20261108-2307.md`) vain kohdan 3 taustaksi; alla nykytila.
PT local_5df52e10-10e4-4b72-9554-0049db300dfe, JU local_06f8c680-4618-42bd-a730-9b6a3e17e0b7. Kaikki koe, EI JUNAAN ilman PT:n/KK:n sanaa
(paitsi kameratappi: PT 23.2x "Mac-pari → PT → KK, sitten junaan 223").
Parit tein: python3 -I scratchpad pari.py (PIL, kuvat vierekkäin, 3600 px) – kirjoita uudelleen tarvittaessa (10 riviä).

## JU:n Mac-jono (pyydetty 23.2x tässä järjestyksessä), kaikki lokit /Users/Shared/Claude/proto-3d/lokit/
1) KAMERATAPPI-3 bee8b407b (natiivi-backup natiivi-ui/kameratappi, wt/proto-natiivi-ui-kameratappi): OMISTAJA 23.20 "iPhonella siirrä se pulun
   yläpuolelle" → KameraTappi.Asettele: !UiKerros.Tabletti → tappi Pulun linnun yläpuolelle keskelle (Rako 6), osuessa Kulmanappeihin
   (vaaka-iPhone) laskeutuu nappien alle. iPad ennallaan. sk-kameratappi-3-iphone.txt, koot iphone + iphone-vaaka,
   lokit nui-kameratappi-3-{iphone,iphone-vaaka}-bee8b407b. Tarkista: tappi Pulun yläpuolella, ei Pulun/nappien päällä → pari PT:lle → KK → junaan.
2) IPAD70-4 a7866450f (natiivi-backup natiivi-ui/esittely-ipad-70, wt/proto-natiivi-ui-ipad-70): KK 23.17 mittasi kerronnan aikana ND ~59 %,
   Eiffel ~65 % (malliprofiili yliarvioi). Uusi NahtavyysEsittely.MitattuZoomi: SeuraaPalkkia-silmukassa (0,3 s) tabletilla mallin kärjet
   (MallinMitat.Naytteet ≤ 3000, TaysiMalli-matriisi joka kerta) → viewport; zoomi skaalataan optisen akselin ympäri: korkeus ≤ 0,70, yläreuna
   ≥ kuvan alareuna + 0,01, alareuna vapaan alueen sisällä; 1,5 s rauhan jälkeen molempiin suuntiin, sitten vain pienenee (ei hengitä).
   Loki/tila: "mitattu 0.xx ruudusta (ylä, ala, akseli), zoomi a → b". sk-ipad70-4-mac.txt (kuvat kerronnan aikana +11/+16/+21 s),
   lokit nui-ipad70-4-ipad-a7866450f. Tarkista ND ja Eiffel ~70 % kaikissa kolmessa, ei kuvan päällä → parit PT:lle → KK.
   Riski: zoomin raja ZoomMax 2,2; jos "zoomi 2.20" ja alle 70 % → katto rajoittaa. Akselin y-arvo olettaa Unity-kameran viewportin = ruutu.
3) PARIISIPALLO-2 5fa61ed04 (natiivi-backup natiivi-ui/pariisi-pallo-kuvat, wt/proto-natiivi-ui-pallo): -1 iPhone katsottu (pari
   lokit/nui-pariisipallo-1-iphone-a97e8583c/pari-s1-k1-k2-l1.jpg): B ok, C pallo näkyy lähimmällä; korjattu A (s-1 seutu taso 11,62 kuvat
   kasassa → SaapumisKuvat.KuvaTaso 14) ja C (hintakyltti ★ Tuileries'n päällä → pallo 48.8646, 2.3268). sk-pariisipallo-2.txt iphone + ipad.
4) ★-KYLTIT 0f62c5656 (natiivi-backup natiivi-ui/tahtikyltit, wt/proto-natiivi-ui-tahdet): NostotKartalla.TahtienIsannat (malli Grand Palais
   / nosto Orsayn taidemuseo / nimi Palais de Chaillot / nimi Forum des Halles), TahdenIsanta, KyltinLaatikko IsantaOn-haara, jono ★ viimeisenä,
   SamaLaatikko-ohitus törmäyksessä; MalliKyltit.NakyvanRuutu, Nimikerros.NimenLaatikko; `ui kohdenostot tahdet 0|1`. sk-tahtikyltit-1-mac.txt
   (iphone-vaaka + ipad, g/t/h-1-ennen|jalkeen), lokit nui-tahtikyltit-1-*-0f62c5656. Lokin "kohdenostot kyltti" → "isäntä (…)" tai "X ei näy".
   Riski: kartan nimet voivat väistää ★:ää → Chaillot/Forum ei ladottu → ★ vanhalla paikalla. Pari PT:lle.
5) KUVATEKSTI-2 b2a7046da (natiivi-backup natiivi-ui/nosto-kuvat-koko, wt/proto-natiivi-ui-nostokuvat): Saapumistraileri nimiYla −
   kuvatekstin korkeus (k-1: PARIISI osui kuvatekstiin iPhonella). iphone, lokit nui-nostokuvat-2-kuvateksti-iphone-b2a7046da.

## AVOIN TEHTÄVÄ (PT 23.2x, ei aloitettu): kuvateksti iPadilla luettavaksi "sama suhteellinen koko kuin iPhonella"
Pulu.uss .mk-traileri__kuvateksti-rivi / -lahde (wt/proto-natiivi-ui-nostokuvat): iPadilla kuva ~2,5× leveämpi, teksti sama pt → lisää
tabletille isompi fonttikoko (esim. UiKerros.Tabletti-luokka tai kuvan leveyteen suhteutettu fontSize LisaaKuvateksti:ssä). Lisäksi iPadilla
PARIISI-otsikko osuu kuvaan (nimiYla = null tabletilla, vanha käytös) – kerro PT:lle, korjaa jos pyytää. Sitten ajo iphone + ipad → pari PT:lle.

## Raportoitu PT:lle tässä istunnossa
- ipad70-3 ja kameratappi-2 parit (PT vei KK:lle; kameratappi OK → omistaja 23.20 yllä); kuvateksti-1 havainnot; lentoraja-6: s. 12,9 karkea
  esivanhempi laatta + sauma = laattojen lataus nopeassa laskussa (NS:n alue), NUI ei koske ilman PT:n sanaa. Lovea s. 13,1 en löytänyt.
- Sitten LENTORAJA-6 vain PT:n sanalla.
