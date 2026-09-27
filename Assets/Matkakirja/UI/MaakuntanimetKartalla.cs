// MAAKUNTIEN KÄSIALANIMET KARTALLA (Natiivi-UI, ELÄVÄ KARTTA 26.9.2026; käsikirjoitus 8,0–11,5 s, videon "Attika").
// Maakuntien nimet isoisän käsialalla (Kirjasin.Kauno, Snell Roundhand) maakunnan kohdalla. MAAKUNTAERÄ (omistaja 27.9.
// klo 08.3x): kartussin maan (pelaajan maa tai testimaa) kaikki maakunnat ovat heränneinä heti, joten nimet ovat
// kartalla staattisina heti ilman kirjoitusta. Lähde on Kartuscha (MusteMuuttui, Laskurit), jotta testikomennot näkyvät
// samoin.
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
        sealed class Nimi
        {
            public string Avain, Teksti;
            public VisualElement El;
            public Label Label;
            public double Lat = double.NaN, Lon;
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
            kerros.JokaRuutu += Paivita;
        }

        /// <summary>Linssi päällä tai muu koko ruudun näkymä: nimet piiloon (samat ehdot kuin nostoilla).</summary>
        public void NaytaSallittu(bool sallitaan) => sallittu = sallitaan;

        public int Maara => nimet.Count;

        /// <summary>Kartussin maan maakunnat kartalle (kaikki heränneitä); poistuneet pois.</summary>
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
            var heranneet = kartussi.Laskurit(maa).Where(x => x.Kaikki > 0).Select(x => x.Maakunta).ToList();
            foreach (var pois in nimet.Keys.Where(k => !heranneet.Contains(k)).ToList())
            {
                nimet[pois].El.RemoveFromHierarchy();
                nimet.Remove(pois);
            }
            foreach (var m in heranneet) if (!nimet.ContainsKey(m)) Lisaa(m);
        }

        Nimi Lisaa(string avain)
        {
            var n = new Nimi { Avain = avain, Teksti = MaakuntaTiedot.Nimi(avain) };
            n.El = Rakenne.El("mk-maakuntanimi", juuri, PickingMode.Ignore);
            n.El.style.display = DisplayStyle.None;
            n.Label = Rakenne.Teksti(n.Teksti, "mk-maakuntanimi__teksti", n.El);
            Kirjasimet.Aseta(n.Label, Kirjasin.Kauno);
            nimet[avain] = n;
            MaakuntaTiedot.Lataa(() =>
            {
                n.Teksti = MaakuntaTiedot.Nimi(avain);
                if (n.Label.text != n.Teksti) n.Label.text = n.Teksti;
                UiKerros.Hae().StartCoroutine(MaakuntaTiedot.Paikka(avain, (lat, lon, ok) =>
                {
                    if (!ok) { Debug.Log("MATKAKIRJA ui muste: ei paikkaa maakunnan nimelle " + avain); return; }
                    n.Lat = lat;
                    n.Lon = lon;
                }));
            });
            return n;
        }

        /// <summary>
        /// Joka ruudussa: paikka kamerasta. Tyyliin kirjoitetaan vain muuttunut arvo, joten levossa (kamera paikallaan)
        /// paneeli ei likaannu.
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
            }
        }

        /// <summary>Testikomennon tila lokiin.</summary>
        public string Kuvaus() =>
            $"kartalla {nimet.Count} nimeä ({maa ?? "-"}): " + string.Join(", ", nimet.Values.Select(n =>
                $"{n.Teksti} {(double.IsNaN(n.Lat) ? "ei paikkaa" : $"{n.Lat:0.00},{n.Lon:0.00}")}{(n.Nakyy ? "" : " (ei ruudulla)")}"));
    }
}
