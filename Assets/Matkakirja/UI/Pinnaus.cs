// PIN-KUVAKE JA PINNATTU PALKKI (omistaja 5.10.2026 klo 23.3x, Raamattu, uusi UI-pohja; juna 146–147). Nostojen ja Pulun chatin
// ylärivin pin-kuvake pinnaa ikkunan: se pysyy auki, vaikka pelaaja liikkuu kartalla (himmennys ja syötelukko pois). Kun karttaa
// liikutetaan tai napautetaan, pinnattu ikkuna pienenee yhden rivin palkiksi oikeaan yläreunaan nappien alle: otsikko ja
// tauko/jatka sekä luennan edistyminen (EDISTYMINEN-pohja). Palkin napautus palauttaa ikkunan; ✕:ää ei ole, pinnaus poistetaan
// ikkunan pin-kuvakkeesta. Vain yksi ikkuna kerrallaan; uusi striimiluenta tai linssin avaus päättää pinnauksen (Pelikoodarin
// Puhe.Pinnaa/PinnattuMuuttui: pinnatun aikana tavalliset Pysayta-kutsut ohitetaan, joten ikkunan sulku ei katkaise puhetta).
using System;
using Matkakirja.Peli;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class Pinnaus
    {
        /// <summary>Pinnattava ikkuna: tunniste (puheen omistaja), otsikko ja ikkunan pienennys/palautus/irrotus.</summary>
        public sealed class Kohde
        {
            public string Omistaja, Otsikko;
            public Action Pienenna, Palauta, Irti;
        }

        public static Pinnaus Viimeisin { get; private set; }
        public static Kohde Nykyinen { get; private set; }
        public static bool Pienena { get; private set; }
        /// <summary>
        /// VÄISTÖ (Päätoimittaja 6.10. klo 00.5x, juna 147): ikkuna, joka väistää chattia (maakuntakortti), käyttää samaa palkkia
        /// ilman puheen pinnausta; palkissa vain otsikko (ei taukoa eikä edistymistä). Napautus palauttaa ikkunan.
        /// </summary>
        public static bool Vaisto { get; private set; }
        /// <summary>Pinnaus vaihtui (ikkunat päivittävät pin-kuvakkeensa ja himmennyksensä).</summary>
        public static event Action Muuttui;

        readonly VisualElement palkki, taytto, raita, kuva;
        int kuvaVersio;
        readonly Label otsikko;
        readonly Button tauko;
        PalloKierto kierto;

        public Pinnaus(UiKerros kerros)
        {
            var turva = kerros.Turva(UiKerros.Tilarivi);
            palkki = Rakenne.Nappi(null, "tk-teema-paperi mk-pinpalkki", Palauta, turva);
            palkki.style.display = DisplayStyle.None;
            palkki.tooltip = "Palauta pinnattu ikkuna";
            var rivi = Rakenne.El("mk-pinpalkki__rivi", palkki, PickingMode.Ignore);
            Rakenne.Ikoni(Ikonit.Viiva["pin"], "mk-pinpalkki__pin", rivi);
            otsikko = Rakenne.Teksti("", "mk-pinpalkki__otsikko", rivi);
            Kirjasimet.Aseta(otsikko, Kirjasin.Kone);
            tauko = Rakenne.Nappi(null, "mk-pinpalkki__tauko", VaihdaTauko, rivi, Ikonit.Tauko);
            tauko.tooltip = "Tauko";
            raita = Rakenne.El("mk-edistyminen mk-pinpalkki__edistyminen", palkki, PickingMode.Ignore);
            taytto = Rakenne.El("mk-edistyminen__taytto", raita, PickingMode.Ignore);
            // Uuden noston ensimmäinen kuva palkin alla 3 s (omistaja 6.10. 23.0x), palkin levyisenä ilman kehystä ja tekstiä.
            kuva = Rakenne.El("mk-pinpalkki__kuva", turva, PickingMode.Ignore);
            kuva.style.display = DisplayStyle.None;
            Puhe.PinnattuMuuttui += PuheMuuttui;
            // Omistaja 6.10. 23.0x: "tilapalkki saisi näyttää koko noston pituutta ei kappaleen": kortin luennalla koko
            // luennan eteneminen (KortinLukija.KokoEdistyminen), muuten (Pulun chat) soivan palan.
            Puhe.Edistyminen += (aika, kesto) =>
            {
                float osa = KortinLukija.KokoEdistyminen(aika, kesto) ?? (kesto > 0f ? Mathf.Clamp01(aika / kesto) : 0f);
                taytto.style.width = Length.Percent(osa * 100f);
            };
            kerros.JokaRuutu += Paivita;
            Ylapalkki.PalkkiPiilossaMuuttui += Asettele;
            kerros.TurvaMuuttui += Asettele;
            Viimeisin = this;
        }

        /// <summary>Ikkunan pin-kuvake: pinnaa tämän ikkunan (edellinen irtoaa) tai poistaa pinnauksen.</summary>
        public static void Vaihda(Kohde k)
        {
            if (k == null) return;
            if (Nykyinen != null && Nykyinen.Omistaja == k.Omistaja) { Irrota(); return; }
            var vanha = Nykyinen;
            Nykyinen = k;
            Pienena = false;
            Vaisto = false;
            vanha?.Irti?.Invoke();
            Puhe.Instanssi?.Pinnaa(k.Omistaja, k.Otsikko);
            Debug.Log($"MATKAKIRJA ui pinnaus: {k.Omistaja} \"{k.Otsikko}\"");
            Viimeisin?.NaytaPalkki(false);
            Muuttui?.Invoke();
        }

        /// <summary>Ikkuna väistää palkiksi (ei puheen pinnausta). false = palkki on jo pinnatun ikkunan käytössä.</summary>
        public static bool Vaista(Kohde k)
        {
            if (k == null || (Nykyinen != null && !Vaisto)) return false;
            Nykyinen = k;
            Vaisto = Pienena = true;
            Debug.Log($"MATKAKIRJA ui pinnaus: väistö {k.Omistaja} \"{k.Otsikko}\"");
            Viimeisin?.NaytaPalkki(true);
            Muuttui?.Invoke();
            return true;
        }

        /// <summary>Väistö päättyi (chat suljettiin tai ikkuna suljettiin): palkki pois, ikkuna hoitaa oman palautuksensa.</summary>
        public static void LopetaVaisto(Kohde k)
        {
            if (!Vaisto || Nykyinen != k) return;
            Nykyinen = null;
            Vaisto = Pienena = false;
            Viimeisin?.NaytaPalkki(false);
            Muuttui?.Invoke();
        }

        /// <summary>Pinnaus pois (pin-kuvakkeesta): puhe jatkuu ikkunan omana luentana, palkki pois.</summary>
        public static void Irrota()
        {
            if (Nykyinen == null) return;
            var k = Nykyinen;
            Nykyinen = null;
            Pienena = false;
            if (Puhe.Instanssi != null && Puhe.Instanssi.Pinnattu == k.Omistaja) Puhe.Instanssi.Irrota();
            Viimeisin?.NaytaPalkki(false);
            k.Irti?.Invoke();
            Debug.Log("MATKAKIRJA ui pinnaus: irti " + k.Omistaja);
            Muuttui?.Invoke();
        }

        /// <summary>Kartan liike tai napautus: pinnattu ikkuna palkiksi (ikkuna kiinni, puhe jatkuu).</summary>
        public static void Pienenna()
        {
            if (Nykyinen == null || Pienena || Vaisto) return;
            Pienena = true;
            Nykyinen.Pienenna?.Invoke();
            Viimeisin?.NaytaPalkki(true);
            Muuttui?.Invoke();
        }

        /// <summary>
        /// Piste (paneelin koordinaatit) osuu näkyvään palkkiin. Ylempi kerros (toinen kortti himmennyksineen) kysyy tätä, ettei
        /// palkin napautus vain sulje sitä (junan 148b video 6.10.: ensimmäinen napautus sulki toisen kortin, vasta toinen palautti).
        /// </summary>
        public static bool OsuuPalkkiin(Vector2 p) =>
            Viimeisin != null && Pienena && Viimeisin.palkki.resolvedStyle.display != DisplayStyle.None && Viimeisin.palkki.worldBound.Contains(p);

        /// <summary>Palkin napautus: pinnattu ikkuna takaisin.</summary>
        public static void Palauta()
        {
            if (Nykyinen == null || !Pienena) return;
            if (Vaisto) { var v = Nykyinen; LopetaVaisto(v); v.Palauta?.Invoke(); return; }
            Pienena = false;
            Viimeisin?.NaytaPalkki(false);
            Nykyinen.Palauta?.Invoke();
            Muuttui?.Invoke();
        }

        /// <summary>Uusi striimiluenta tai linssi päätti pinnauksen (Puhe.Pinnattu ei enää ole tämä ikkuna).</summary>
        void PuheMuuttui()
        {
            var p = Puhe.Instanssi?.Pinnattu;
            if (Nykyinen == null || Vaisto || p == Nykyinen.Omistaja) return;
            var k = Nykyinen;
            Nykyinen = null;
            bool olipienena = Pienena;
            Pienena = false;
            NaytaPalkki(false);
            if (!olipienena) k.Irti?.Invoke();
            Debug.Log("MATKAKIRJA ui pinnaus: päättyi (uusi luenta tai linssi) " + k.Omistaja);
            Muuttui?.Invoke();
        }

        /// <summary>
        /// Uuden pinnatun noston ensimmäinen kuva palkin alle 3 s:ksi, sitten häivytys (--tk-kesto-sulku 200 ms). null = ei kuvaa
        /// (mitään ei näytetä). Leveys palkin, korkeus kuvan suhteesta; kulmat kulma.nappi, ei kehystä eikä tekstiä.
        /// </summary>
        public static void NaytaKuva(string url)
        {
            var p = Viimeisin;
            if (p == null) return;
            int v = ++p.kuvaVersio;
            p.kuva.style.display = DisplayStyle.None;
            p.kuva.style.opacity = 0f;
            if (string.IsNullOrEmpty(url)) return;
            NostoSisalto.HaeKuva(url, t =>
            {
                if (v != p.kuvaVersio || t == null || !Pienena || p.palkki.resolvedStyle.display == DisplayStyle.None) return;
                p.kuva.style.backgroundImage = new StyleBackground(t);
                float suhde = t.width > 0 ? (float)t.height / t.width : 2f / 3f;
                // Palkki voi olla vielä avautumassa (Ponnahdus): paikka seuraavassa kehyksessä, kun sen asettelu on valmis.
                p.kuva.schedule.Execute(() =>
                {
                    if (v != p.kuvaVersio) return;
                    p.SijoitaKuva(suhde);
                    p.kuva.style.display = DisplayStyle.Flex;
                    p.kuva.schedule.Execute(() => { if (v == p.kuvaVersio) p.kuva.style.opacity = 1f; });
                }).StartingIn(50);
                p.kuva.schedule.Execute(() =>
                {
                    if (v != p.kuvaVersio) return;
                    p.kuva.style.opacity = 0f;
                    p.kuva.schedule.Execute(() => { if (v == p.kuvaVersio) p.kuva.style.display = DisplayStyle.None; }).StartingIn(Tyylikirja.Kesto.Sulku);
                }).StartingIn(3000);
                Debug.Log("MATKAKIRJA ui pinnaus: ensimmäinen kuva 3 s");
            });
        }

        void SijoitaKuva(float suhde)
        {
            var isa = palkki.parent;
            if (isa == null || palkki.layout.width <= 0) return;
            var r = palkki.layout;
            kuva.style.left = r.xMin;
            kuva.style.top = r.yMax + Tyylikirja.Vali.Xs;
            kuva.style.width = r.width;
            kuva.style.height = Mathf.Round(r.width * Mathf.Clamp(suhde, 0.4f, 1f));
        }

        void NaytaPalkki(bool nayta)
        {
            if (!nayta) { kuvaVersio++; kuva.style.display = DisplayStyle.None; }
            if (nayta)
            {
                otsikko.text = Nykyinen?.Otsikko ?? "";
                tauko.style.display = raita.style.display = Vaisto ? DisplayStyle.None : DisplayStyle.Flex;
                Asettele();
                Ponnahdus.Avaa(palkki, origo: new TransformOrigin(Length.Percent(100), Length.Percent(0)));
            }
            else if (palkki.style.display != DisplayStyle.None) Ponnahdus.Sulje(palkki);
        }

        /// <summary>
        /// Omistaja 6.10. 23.0x: "Pinnattu nosto saisi olla suurennuslasin kanssa samalla rivillä sen vasemmalla puolella" –
        /// hakunapin (Karttaselite.LinssitNappi) riville pystykeskitettynä, oikea reuna 8 pt napin vasemmalla, korkeus
        /// nappi.ohjaus; leveys joustaa isoisän kortin oikeaan reunaan + 8 pt asti (160–260 pt), otsikko katkeaa …:lla.
        /// Ilman näkyvää hakunappia entinen paikka nappien alla (varaus + 8 + 40 + 8).
        /// </summary>
        void Asettele()
        {
            var ui = UiNakymat.Olemassa ? UiNakymat.Hae() : null;
            var n = ui?.Karttaselite?.LinssitNappi;
            var isa = palkki.parent;
            if (n != null && isa != null && n.resolvedStyle.display != DisplayStyle.None && n.worldBound.width > 0 && isa.layout.width > 0)
            {
                var r = isa.WorldToLocal(n.worldBound);
                float vasen = Tyylikirja.Vali.L;
                var mk = ui.Matkakirja != null ? ui.Matkakirja.Rajat : Rect.zero;
                if (mk.width > 0)
                {
                    var k = isa.WorldToLocal(mk);
                    if (k.yMax > r.yMin && k.yMin < r.yMax) vasen = Mathf.Max(vasen, k.xMax + Tyylikirja.Vali.S);
                }
                float lev = Mathf.Max(160f, r.xMin - Tyylikirja.Vali.S - vasen);
                float korkeus = palkki.layout.height > 0 && !float.IsNaN(palkki.layout.height) ? Mathf.Max(Tyylikirja.Nappi.Ohjaus, palkki.layout.height) : Tyylikirja.Nappi.Ohjaus;
                float top = Mathf.Round(r.y + (r.height - korkeus) * 0.5f), oikea = Mathf.Round(isa.layout.width - r.xMin + Tyylikirja.Vali.S);
                if (palkki.style.top.value.value != top) palkki.style.top = top;
                if (palkki.style.right.value.value != oikea) palkki.style.right = oikea;
                if (palkki.style.maxWidth.value.value != lev) palkki.style.maxWidth = lev;
                palkki.style.minHeight = Tyylikirja.Nappi.Ohjaus;
                SovitaOtsikko(lev);
                return;
            }
            palkki.style.top = Ylapalkki.Varaus + 8f + 40f + 8f;
            float oik = Ylapalkki.Piilossa ? 10f + 40f + 8f : 10f;
            palkki.style.right = oik;
            float vapaa = isa != null && isa.layout.width > 0 ? isa.layout.width - oik - Tyylikirja.Vali.L : 260f;
            palkki.style.maxWidth = vapaa;
            palkki.style.minHeight = StyleKeyword.Null;
            SovitaOtsikko(vapaa);
        }

        float perusKoko;

        /// <summary>
        /// Omistaja 6.10. 23.0x: "otsikko pitää aina mahtua kokonaan palkkiin": ei kolmea pistettä; palkki levenee otsikon mukaan
        /// käytettävään tilaan asti, sitten kirjasin enintään 85 %:iin ja lopuksi toinen rivi.
        /// </summary>
        void SovitaOtsikko(float kaytettava)
        {
            if (otsikko.panel == null || palkki.layout.width <= 0 || float.IsNaN(otsikko.layout.width) || string.IsNullOrEmpty(otsikko.text)) return;
            float nyt = otsikko.resolvedStyle.fontSize;
            if (perusKoko <= 0 && otsikko.style.fontSize.keyword != StyleKeyword.Undefined) perusKoko = nyt;
            if (perusKoko <= 0) perusKoko = nyt;
            float kehys = palkki.layout.width - otsikko.layout.width;
            float w = otsikko.MeasureTextSize(otsikko.text, 0, VisualElement.MeasureMode.Undefined, 0, VisualElement.MeasureMode.Undefined).x;
            if (nyt > 0 && perusKoko > 0) w *= perusKoko / nyt;   // mitta peruskoossa
            float tila = kaytettava - kehys;
            bool pieni = w > tila, rivit = w * 0.85f > tila;
            var koko = pieni ? new StyleLength(Mathf.Round(perusKoko * 0.85f * 10f) / 10f) : new StyleLength(StyleKeyword.Null);
            if (otsikko.style.fontSize != koko) otsikko.style.fontSize = koko;
            var ws = rivit ? WhiteSpace.Normal : WhiteSpace.NoWrap;
            if (otsikko.style.whiteSpace != ws) otsikko.style.whiteSpace = ws;
            if (otsikko.style.textOverflow != TextOverflow.Clip) otsikko.style.textOverflow = TextOverflow.Clip;
        }

        void VaihdaTauko()
        {
            var p = Puhe.Instanssi;
            if (p == null) return;
            if (p.Tauolla) p.Jatka(); else p.Tauko();
        }

        void Paivita()
        {
            if (palkki.style.display != DisplayStyle.None) Asettele();   // hakunappi voi siirtyä (selitenappi, kierto)
            if (kierto == null)
            {
                kierto = UnityEngine.Object.FindAnyObjectByType<PalloKierto>();
                if (kierto != null) { kierto.PelaajanEle += Pienenna; kierto.Napautettu += _ => Pienenna(); }
            }
            if (Nykyinen == null || !Pienena || Vaisto) return;
            bool tauolla = Puhe.Instanssi != null && Puhe.Instanssi.Tauolla;
            if (tauko.ClassListContains("mk-pinpalkki__tauko--jatka") != tauolla)
            {
                tauko.EnableInClassList("mk-pinpalkki__tauko--jatka", tauolla);
                tauko.Clear();
                tauko.Add(new SvgIkoni(tauolla ? Ikonit.Toista : Ikonit.Tauko));
                tauko.tooltip = tauolla ? "Jatka" : "Tauko";
            }
        }

        /// <summary>Testi `ui pinnaus [palkki <otsikko> | pois]`: tila tai palkki ilman ikkunaa (kuvaa varten).</summary>
        public static string Testi(string loput)
        {
            var o = (loput ?? "").Trim();
            if (o.StartsWith("palkki"))
            {
                Nykyinen = new Kohde { Omistaja = "testi", Otsikko = o.Length > 7 ? o.Substring(7) : "Korintin kanava" };
                Pienena = true;
                Viimeisin?.NaytaPalkki(true);
                return "pinnaus: testipalkki";
            }
            if (o == "pois") { Nykyinen = null; Pienena = false; Viimeisin?.NaytaPalkki(false); return "pinnaus: pois"; }
            var r = Viimeisin?.palkki.worldBound ?? default;
            return $"pinnaus: {(Nykyinen?.Omistaja ?? "-")} \"{Nykyinen?.Otsikko}\", pienenä {Pienena}, palkki {r.xMin:0},{r.yMin:0} {r.width:0}×{r.height:0}, puhe {Puhe.Instanssi?.Pinnattu ?? "-"}";
        }
    }
}
