# #810 lähteet, tuotantotapa ja hyväksyntäportti

Tekoälyllä tuotettu kuuden 2D-tavoitehavainnekuvan erä. Sisäinen image_gen, tasan kuusi kokonaisen kuvan kutsua, yksi per paikka. Ei uusintoja, osittaista luovaa korjausta, API-fallbackia tai Tripo-/3D-kutsuja. Kaikki kuusi natiivikuvaa ovat muuttumattomia 1448 × 1086 RGB PNG -tiedostoja (4:3). QA-kooste ja tarkastusrajaukset eivät ole uusia generointeja tai erillisiä tuotantokuvia.

Tilauksen lähde: posti/paatoimittaja-codex-juoksupeli-havainnekuvat-luuppi-810-20261021.md, commit d70acb89ff66a7e3d91c608c3f15470ed62460cb, blob 4bb3222f44c12e8751a5503248d1f8c6a21028db, luettu kokonaan. Omistajan portti klo 12.22: ”ok ja näytä kuvat minulle ennen looppia.” #809 oli postitoimitettu ja tavuntarkistettu ennen tämän erän aloitusta.

Kuvat annettu viitteinä, ei muokattavina kohteina:
1. Hyväksytty #807-latauskuva, SHA-256 56737efea9c50406f883d3c7a3bc58ab8ba145771234d5b037a64d091d2affc3: tyylin, valon, materiaalien, värien ja Puyi-asun lähde. Sen lähikameraa ja liike-epäterävyyttä ei pyydetty kopioimaan.
2. puyi/cape-sources-v1/puyi-viitta-takaa.png: yksi letti ja kultaisen asun/viitan takaosan identiteetti.
3. juoksupeli-taivaspanoraama-20261019/references/01-sisapiha.png: pelin takaviiston kameran ja hahmon koon suuntaa antava lähde, ei uusiin kuviin sovitettu peligeometriatodiste.
Kaikki viitteet katsottu henkilökohtaisesti tässä keskustelussa; polut, tavut ja tiivisteet REFERENCE-MANIFEST.jsonissa. PROMPT-SET.json sisältää täsmälliset käytetyt argumentit, ja jokaisen kehotteen SHA-256 vastaa IMAGE-CALLS.jsonin kutsua.

QA.md/QA.json ilmoittavat kuvan05 virheellisen 8 × 6 -nastoituksen, kuvan06 pienet tekstimäiset kilpimerkit sekä visuaalisen kameran/koonsovituksen rajat. Kuuden ehdokkaan toimitus ei väitä kaikkien lähde-ehtojen täyttymistä. PT tarkistaa, KK näyttää omistajalle ENNEN pelin muokkausluuppia. Luuppia, pelimuutoksia, mallituotantoa, peliviitteiden vaihtoa tai julkaisua ei aloitettu. R2-kuitit todistavat vain näiden kuvatiedostojen teknisen toimituksen.

Kaikki tämän työn tiedostot, väliaineisto ja toimituspaketti ovat fyysisesti T7:llä. Alkuperäiset generoituja kuvia sisältävät oletustiedostot säilyvät NASilla. Sisälevyn muiden sessioiden tiedostoja tai sovellusprofiileja ei muutettu.
