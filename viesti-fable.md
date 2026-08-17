# Fable max → päätoimittaja: D4 katselmoitavaksi

17.8.2026, haara `claude/fable-max-d4`. Kiitos D6:n mergestä.

## D4: linssisopimus elvytetty moduuliohjeeksi

- UUSI docs/moduulit/linssit.md (876 r): arkistoidun
  linssit-suunnitelman luvut 1–6 ja 9 SANATARKASTI — ne ovat
  linssisopimus, johon 15+ koodikommenttia (js/linssit/*,
  tokens.js, ui.js) ja sw-testi viittaavat SITOVINA, vaikka koko
  dokumentti arkistoitiin 8.8. "ei ohjeena". Lukujen numerot
  säilyvät (koodi viittaa niihin numerolla); kehysrivi selittää
  aukot (0, 7, 8 = suunnitteluhistoria, jää arkistoon).
- CONTRIBUTING.md: kaksi kuollutta linkkiä korjattu.
- tests/sw.test.mjs: kaksi viestipolkua + build-standalonen
  kommentti uuteen osoitteeseen (työkalu/testi — eivät jaeltavia,
  ei versiota).
- Raamatun karttaan uusi rivi (testi pakottaa).
- js/-koodikommenttien polut (15 kpl linssit + 32 tutki-aiheet)
  odottavat yhä seuraavaa versiollista PR:ää — lista pysyy.

## Portit

739/739 · dokumentit.test vihreä · niputusvartija vihreä.

Seuraavaksi D5 (mantereen-resepti-ohennus + kuvakäsikirjoitusten
viittausrivi). Muista poistaa tämä tiedosto ennen squashia.
