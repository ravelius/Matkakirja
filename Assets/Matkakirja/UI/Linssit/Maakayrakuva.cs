// VERTAILUN MAAKÄYRÄT (Natiivi-UI): webin js/maakayrat.js piirraVertailu → lohko +
// svg.maakayra ja css .maakayrat / .maakayra-*. Geometria tulee valmiina Linssisepän
// Maakayrat.Vertailu-laskusta (Linssit/Ydin/Maat/Maakayrat.cs, viewBox 300 × 150):
// tämä vain piirtää sen.
//
//   Maakayrat.Rakenna   ristikko (web .maakayrat: kapealla yksi sarake, leveällä kaksi
//                       rinnan; gap 1rem 1.5rem) + lähderivi (web .lahde.maakayra-lahde).
//   Maakayrakuva        yksi kaavio = yksi VisualElement: viivat, pätkät ja pisteet
//                       Painter2D:llä generateVisualContentissa (ei elementtiä per osa;
//                       vertailussa on noin 550 osaa), akselitekstit Labeleina kuten
//                       Maa numeroina -sivulla (NumeroKuvio: skaalaus ja tekstien paikat).
//
// Kynät sanatarkasti webin css:stä: .maakayra-viiva #a4691c 1.8, -toinen #b03a2b,
// -kolmas #4a6b3a, -neljas #35577f (1.4, opacity 0.85), apuviiva rgba(70,51,31,.18) 0.7,
// pohjaviiva rgba(70,51,31,.6) 1, akseli 8.5 px. Pätkät pyöreillä päillä ja liitoksilla,
// suorat viivat SVG:n oletuksella (butt). Yksinäinen havainto on piste r 1.6 (-piste).
using System.Collections.Generic;
using Matkakirja.Linssit.Maat;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public static class MaakayraRistikko
    {
        /// <summary>Kaksi saraketta tästä leveydestä alkaen (web @media min-width 700px; arkin sisus on sitä kapeampi).</summary>
        const float KaksiSaraketta = 640f;
        const float VaakaRako = 24f, PystyRako = 16f;

        /// <summary>
        /// Käyrälohkot ja lähderivi kuvan mukaan isä-elementtiin (web piirraVertailu korttien
        /// jälkeen). Tyhjä kuva → johdantorivi "Näistä maista ei ole tilastosarjoja."
        /// </summary>
        public static void Rakenna(Vertailukuva kuva, VisualElement isa)
        {
            if (kuva.Tyhja != null)
            {
                Rakenne.Teksti(kuva.Tyhja, "mk-maakayrat__tila", isa);
                return;
            }
            var ristikko = Rakenne.El("mk-maakayrat", isa, PickingMode.Ignore);
            foreach (var lohko in kuva.Lohkot)
            {
                var osa = Rakenne.El("mk-maakayrat__lohko", ristikko, PickingMode.Ignore);
                var otsikko = Rakenne.Teksti(lohko.Otsikko ?? "", "mk-maakayrat__otsikko", osa);
                Kirjasimet.Aseta(otsikko, Kirjasin.KoneLihava);
                osa.Add(new Maakayrakuva(lohko));
            }
            Sarakkeet(ristikko);
            if (!string.IsNullOrEmpty(kuva.Lahderivi))
                Rakenne.Teksti(kuva.Lahderivi, "mk-maakayrat__lahde", isa);
        }

        /// <summary>Web grid-template-columns 1fr / 1fr 1fr: leveys koodista, koska USS:ssä ei ole gridiä.</summary>
        static void Sarakkeet(VisualElement r)
        {
            void Asettele()
            {
                float w = r.contentRect.width;
                if (float.IsNaN(w) || w <= 0) return;
                int n = w >= KaksiSaraketta ? 2 : 1;
                float lw = Mathf.Floor((w - VaakaRako * (n - 1)) / n);
                for (int i = 0; i < r.childCount; i++)
                {
                    var c = r[i];
                    c.style.width = lw;
                    c.style.marginRight = i % n == n - 1 ? 0 : VaakaRako;
                    c.style.marginBottom = PystyRako;
                }
            }
            r.RegisterCallback<GeometryChangedEvent>(e => { if (!Mathf.Approximately(e.oldRect.width, e.newRect.width)) Asettele(); });
            r.schedule.Execute(Asettele);
        }
    }

    /// <summary>Yksi vertailukäyrä (web svg.maakayra) Linssisepän KayraLohkosta.</summary>
    public sealed class Maakayrakuva : NumeroKuvio
    {
        readonly List<KayraOsa> osat;

        public Maakayrakuva(KayraLohko lohko) : base((float)lohko.Korkeus)
        {
            AddToClassList("mk-maakayrat__kuvio");
            osat = lohko.Osat;
            foreach (var o in osat)
                if (o.Tyyppi == "text")
                    LisaaTeksti(o.Teksti ?? "", "", (float)o.X, (float)o.Y,
                        o.Ankkuri == "end" ? 1f : o.Ankkuri == "middle" ? 0.5f : 0f);
        }

        protected override void Piirra(Painter2D p)
        {
            foreach (var o in osat)
            {
                switch (o.Tyyppi)
                {
                    case "line":
                    {
                        var (vari, leveys) = Kyna(o.Luokka);
                        Viiva(p, vari, leveys, (float)o.X1, (float)o.Y1, (float)o.X2, (float)o.Y2);
                        break;
                    }
                    case "polyline":
                    {
                        if (o.Pisteet == null || o.Pisteet.Count < 2) break;
                        var (vari, leveys) = Kyna(o.Luokka);
                        p.strokeColor = vari;
                        p.lineWidth = leveys * S;
                        p.lineCap = LineCap.Round;
                        p.lineJoin = LineJoin.Round;
                        p.BeginPath();
                        p.MoveTo(P((float)o.Pisteet[0].X, (float)o.Pisteet[0].Y));
                        for (int i = 1; i < o.Pisteet.Count; i++)
                            p.LineTo(P((float)o.Pisteet[i].X, (float)o.Pisteet[i].Y));
                        p.Stroke();
                        break;
                    }
                    case "circle":
                    {
                        string luokka = o.Luokka ?? "";
                        if (luokka.EndsWith("-piste")) luokka = luokka.Substring(0, luokka.Length - 6);
                        p.fillColor = Kyna(luokka).Vari;
                        Ympyra(p, P((float)o.X, (float)o.Y), (float)o.R * S);
                        p.Fill();
                        break;
                    }
                }
            }
        }

        static readonly Color Toinen = new Color32(176, 58, 43, 255);    // #b03a2b
        static readonly Color Kolmas = new Color32(74, 107, 58, 255);    // #4a6b3a
        static readonly Color Neljas = new Color32(53, 87, 127, 255);    // #35577f
        static readonly Color Suomi = new Color32(70, 51, 31, 97);       // rgba(70,51,31,.38)
        const float LisaAlfa = 0.85f, EnnusteAlfa = 0.45f;

        /// <summary>Webin css-luokan kynä: väri (opacity mukana) ja viivan leveys viewBox-yksiköissä.</summary>
        static (Color Vari, float Leveys) Kyna(string luokka) => luokka switch
        {
            "maakayra-viiva" => (Kulta, 1.8f),
            "maakayra-toinen" => (Alfa(Toinen, LisaAlfa), 1.4f),
            "maakayra-kolmas" => (Alfa(Kolmas, LisaAlfa), 1.4f),
            "maakayra-neljas" => (Alfa(Neljas, LisaAlfa), 1.4f),
            "maakayra-ennuste" => (Alfa(Kulta, EnnusteAlfa), 1.3f),
            "maakayra-suomi" => (Suomi, 1f),
            "maakayra-apuviiva" => (Apuviiva, 0.7f),
            "maakayra-pohjaviiva" => (Pohjaviiva, 1f),
            _ => (Pohjaviiva, 1f),
        };
    }
}
