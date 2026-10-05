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
        /// <summary>Pinnaus vaihtui (ikkunat päivittävät pin-kuvakkeensa ja himmennyksensä).</summary>
        public static event Action Muuttui;

        readonly VisualElement palkki, taytto;
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
            var raita = Rakenne.El("mk-edistyminen mk-pinpalkki__edistyminen", palkki, PickingMode.Ignore);
            taytto = Rakenne.El("mk-edistyminen__taytto", raita, PickingMode.Ignore);
            Puhe.PinnattuMuuttui += PuheMuuttui;
            Puhe.Edistyminen += (aika, kesto) => taytto.style.width = Length.Percent(kesto > 0f ? Mathf.Clamp01(aika / kesto) * 100f : 0f);
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
            vanha?.Irti?.Invoke();
            Puhe.Instanssi?.Pinnaa(k.Omistaja, k.Otsikko);
            Debug.Log($"MATKAKIRJA ui pinnaus: {k.Omistaja} \"{k.Otsikko}\"");
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
            if (Nykyinen == null || Pienena) return;
            Pienena = true;
            Nykyinen.Pienenna?.Invoke();
            Viimeisin?.NaytaPalkki(true);
            Muuttui?.Invoke();
        }

        /// <summary>Palkin napautus: pinnattu ikkuna takaisin.</summary>
        public static void Palauta()
        {
            if (Nykyinen == null || !Pienena) return;
            Pienena = false;
            Viimeisin?.NaytaPalkki(false);
            Nykyinen.Palauta?.Invoke();
            Muuttui?.Invoke();
        }

        /// <summary>Uusi striimiluenta tai linssi päätti pinnauksen (Puhe.Pinnattu ei enää ole tämä ikkuna).</summary>
        void PuheMuuttui()
        {
            var p = Puhe.Instanssi?.Pinnattu;
            if (Nykyinen == null || p == Nykyinen.Omistaja) return;
            var k = Nykyinen;
            Nykyinen = null;
            bool olipienena = Pienena;
            Pienena = false;
            NaytaPalkki(false);
            if (!olipienena) k.Irti?.Invoke();
            Debug.Log("MATKAKIRJA ui pinnaus: päättyi (uusi luenta tai linssi) " + k.Omistaja);
            Muuttui?.Invoke();
        }

        void NaytaPalkki(bool nayta)
        {
            if (nayta)
            {
                otsikko.text = Nykyinen?.Otsikko ?? "";
                Asettele();
                Ponnahdus.Avaa(palkki, origo: new TransformOrigin(Length.Percent(100), Length.Percent(0)));
            }
            else if (palkki.style.display != DisplayStyle.None) Ponnahdus.Sulje(palkki);
        }

        /// <summary>Oikeaan yläreunaan nappien alle (Karttaselitteen ja linssiselitteen kaava: varaus + 8 + 40 + 8).</summary>
        void Asettele()
        {
            palkki.style.top = Ylapalkki.Varaus + 8f + 40f + 8f;
            palkki.style.right = Ylapalkki.Piilossa ? 10f + 40f + 8f : 10f;
        }

        void VaihdaTauko()
        {
            var p = Puhe.Instanssi;
            if (p == null) return;
            if (p.Tauolla) p.Jatka(); else p.Tauko();
        }

        void Paivita()
        {
            if (kierto == null)
            {
                kierto = UnityEngine.Object.FindAnyObjectByType<PalloKierto>();
                if (kierto != null) { kierto.PelaajanEle += Pienenna; kierto.Napautettu += _ => Pienenna(); }
            }
            if (Nykyinen == null || !Pienena) return;
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
