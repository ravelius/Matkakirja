// MAAKUNTIEN KÄSIALANIMET KARTALLA (Natiivi-UI, ELÄVÄ KARTTA 26.9.2026; käsikirjoitus 8,0–11,5 s, videon "Attika").
// Kun maakunta herää, sen nimi kirjoittuu isoisän käsialalla (Kirjasin.Kauno, Snell Roundhand) maakunnan kohdalle
// 1,2 s:ssa merkki kerrallaan ja jää pysyväksi. Kartalla ovat kartussin maan (pelaajan maa tai testimaa) heränneet
// maakunnat; lähde on Kartuscha (MaakuntaHerasi, MusteMuuttui, Laskurit), jotta testikomennot näkyvät samoin.
//
// UI-kerros kuten NostotKartalla (UiKerros.Nostot): paikka PalloKierto.RuutuPiste(lat, lon) → paneelin piste joka
// ruudussa, mutta tyyli kirjoitetaan vain, kun piste liikkuu (lepopiirto: levossa ei yhtään muutosta). Paikka on
// maakunnan keskipiste (MaakuntaTiedot.Paikka: Natiivisepän Maakuntajako-keskipiste, kun rajapinta on kytketty; varana
// maakunnan nostojen mediaani). Piilossa linssin aikana (NaytaSallittu, kuten nostot) ja kun nostokerros ei näy.
using System.Collections.Generic;
using System.Linq;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class MaakuntanimetKartalla
    {
        const float KirjoitusKesto = 1.2f;

        sealed class Nimi
        {
            public string Avain, Teksti;
            public VisualElement El;
            public Label Label;
            public double Lat = double.NaN, Lon;
            /// <summary>Kirjoituksen alku (Time.unscaledTime) tai −1 = valmis.</summary>
            public float Alku = -1f;
            public Vector2 Piste = new Vector2(float.NaN, float.NaN);
            public bool Nakyy;
        }

        readonly VisualElement juuri;
        readonly Kartuscha kartussi;
        readonly Dictionary<string, Nimi> nimet = new Dictionary<string, Nimi>();
        PalloKierto kierto;
        string maa;
        bool sallittu = true, kerrosNakyy;

        public MaakuntanimetKartalla(UiKerros kerros, Kartuscha kartussi)
        {
            this.kartussi = kartussi;
            juuri = Rakenne.El("mk-maakuntanimet", kerros.Juuri(UiKerros.Nostot), PickingMode.Ignore);
            // Nostomerkkien alle: merkit ja niiden napautus pysyvät päällimmäisinä.
            juuri.SendToBack();
            kartussi.MusteMuuttui += Synkronoi;
            kartussi.MaakuntaHerasi += Heraa;
            kerros.JokaRuutu += Paivita;
        }

        /// <summary>Linssi päällä tai muu koko ruudun näkymä: nimet piiloon (samat ehdot kuin nostoilla).</summary>
        public void NaytaSallittu(bool sallitaan) => sallittu = sallitaan;

        public int Maara => nimet.Count;

        /// <summary>Kartussin maan heränneet maakunnat kartalle (ilman kirjoitusta); poistuneet pois.</summary>
        void Synkronoi()
        {
            string uusi = kartussi.Maa;
            if (uusi != maa)
            {
                foreach (var n in nimet.Values) n.El.RemoveFromHierarchy();
                nimet.Clear();
                maa = uusi;
            }
            if (maa == null) return;
            var heranneet = kartussi.Laskurit(maa).Where(x => x.Loydetyt > 0).Select(x => x.Maakunta).ToList();
            foreach (var pois in nimet.Keys.Where(k => !heranneet.Contains(k)).ToList())
            {
                nimet[pois].El.RemoveFromHierarchy();
                nimet.Remove(pois);
            }
            foreach (var m in heranneet) if (!nimet.ContainsKey(m)) Lisaa(m, false);
        }

        /// <summary>Maakunta heräsi: nimi kirjoittuu (tai kirjoitetaan uudelleen testikomennossa).</summary>
        void Heraa(string avain)
        {
            if (kartussi.Maa == null || !avain.StartsWith(kartussi.Maa + ":", System.StringComparison.Ordinal)) return;
            if (kartussi.Maa != maa) Synkronoi();
            if (!nimet.TryGetValue(avain, out var n)) n = Lisaa(avain, true);
            else if (!LinssiUi.VahennettyLiike()) n.Alku = Time.unscaledTime;
        }

        Nimi Lisaa(string avain, bool kirjoita)
        {
            var n = new Nimi { Avain = avain, Teksti = MaakuntaTiedot.Nimi(avain) };
            n.El = Rakenne.El("mk-maakuntanimi", juuri, PickingMode.Ignore);
            n.El.style.display = DisplayStyle.None;
            n.Label = Rakenne.Teksti(n.Teksti, "mk-maakuntanimi__teksti", n.El);
            Kirjasimet.Aseta(n.Label, Kirjasin.Kauno);
            if (kirjoita && !LinssiUi.VahennettyLiike()) n.Alku = Time.unscaledTime;
            nimet[avain] = n;
            MaakuntaTiedot.Lataa(() =>
            {
                n.Teksti = MaakuntaTiedot.Nimi(avain);
                if (n.Alku < 0f && n.Label.text != n.Teksti) n.Label.text = n.Teksti;
                UiKerros.Hae().StartCoroutine(MaakuntaTiedot.Paikka(avain, (lat, lon, ok) =>
                {
                    if (!ok) { Debug.Log("MATKAKIRJA ui muste: ei paikkaa maakunnan nimelle " + avain); return; }
                    n.Lat = lat;
                    n.Lon = lon;
                    // Kirjoitus alkaa vasta, kun nimi voi näkyä (paikka tuli datan jälkeen).
                    if (n.Alku >= 0f) n.Alku = Time.unscaledTime;
                }));
            });
            return n;
        }

        /// <summary>
        /// Joka ruudussa: paikka kamerasta ja kirjoitusvaihe. Tyyliin kirjoitetaan vain muuttunut arvo, joten levossa
        /// (kamera paikallaan, ei kirjoitusta) paneeli ei likaannu.
        /// </summary>
        void Paivita()
        {
            var k = NostoKerros.Instanssi;
            bool nakyy = sallittu && maa != null && nimet.Count > 0 && k != null && k.Nakyvissa && juuri.panel != null;
            if (nakyy != kerrosNakyy)
            {
                kerrosNakyy = nakyy;
                juuri.style.display = nakyy ? DisplayStyle.Flex : DisplayStyle.None;
            }
            if (!nakyy) return;
            if (kierto == null) kierto = k.kierto != null ? k.kierto : Object.FindAnyObjectByType<PalloKierto>();
            if (kierto == null) return;
            bool liikkuu = !kierto.Levossa;
            var paneeli = juuri.panel;
            foreach (var n in nimet.Values)
            {
                Vector2 r = default;
                bool ruudulla = !double.IsNaN(n.Lat) && kierto.RuutuPiste(n.Lat, n.Lon, out r);
                if (ruudulla)
                {
                    var p = RuntimePanelUtils.ScreenToPanel(paneeli, new Vector2(r.x, Screen.height - r.y));
                    // Kuten NostotKartalla (löydös 27): liikkeessä pyöristämättä, levossa kokonaiselle pisteelle.
                    if (!liikkuu) p = new Vector2(Mathf.Round(p.x), Mathf.Round(p.y));
                    if (float.IsNaN(n.Piste.x) || (p - n.Piste).sqrMagnitude > 0.0025f)
                    {
                        n.Piste = p;
                        n.El.style.translate = new Translate(p.x, p.y);
                    }
                }
                if (ruudulla != n.Nakyy)
                {
                    n.Nakyy = ruudulla;
                    n.El.style.display = ruudulla ? DisplayStyle.Flex : DisplayStyle.None;
                }
                if (n.Alku < 0f || !ruudulla) continue;
                // Löytö syntyy nostokortin avauksesta: nimi kirjoittuu vasta, kun kortti on suljettu (näkyy kartalla).
                if (UiNakymat.Hae()?.Nostokortti?.Auki == true) n.Alku = Time.unscaledTime;
                // Kirjoitus: merkki kerrallaan, loput näkymättöminä (keskitetty nimi ei siirry kirjoittaessa).
                float t = (Time.unscaledTime - n.Alku) / KirjoitusKesto;
                if (t >= 1f) n.Alku = -1f;
                else Ruudunpaivitys.Herata(0.1f);
                int m = Mathf.Clamp(Mathf.FloorToInt(n.Teksti.Length * Mathf.Clamp01(t)), 0, n.Teksti.Length);
                string teksti = m >= n.Teksti.Length ? n.Teksti : n.Teksti.Substring(0, m) + "<alpha=#00>" + n.Teksti.Substring(m);
                if (n.Label.text != teksti) n.Label.text = teksti;
            }
        }

        /// <summary>Testikomennon tila lokiin.</summary>
        public string Kuvaus() =>
            $"kartalla {nimet.Count} nimeä ({maa ?? "-"}): " + string.Join(", ", nimet.Values.Select(n =>
                $"{n.Teksti} {(double.IsNaN(n.Lat) ? "ei paikkaa" : $"{n.Lat:0.00},{n.Lon:0.00}")}{(n.Nakyy ? "" : " (ei ruudulla)")}"));
    }
}
