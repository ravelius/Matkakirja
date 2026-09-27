using System;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>KATEGORIAMALLI TÄHTI (kadonneet ihmeet), ks. KategoriaApurit.cs ja proto-3d/lokit/mallinseppa-rajapinta.md §5.</summary>
    public sealed partial class Symbolimallit
    {
        /// <summary>
        /// KADONNUT IHME: kompassiruusun tähti oikeana 3D-esineenä (paneelin kompassiruusu). Neljä pitkää pääsakaraa ja neljä
        /// lyhyempää väli-ilmansuuntaa taaempana ja ohuempana kuten kaiverretussa kompassiruusussa. Jokainen sakara on harjanne,
        /// jonka puolikkaat ovat vaalea ja tumma (edestä vastapäivään vaalea, takana päinvastoin), joten ruusun pyörre näkyy
        /// edestä ja takaa ja harjanne myös ylhäältä ja sivulta. Kyljellä on paksuutta, ja se ohenee kärkiin teräväksi.
        /// Keskeltä lähtee syvyyssakara katsojaa kohti ja taakse: edestä se on ruusun keskikärki, ylhäältä ja sivulta tähden
        /// kolmas akseli. Siksi suoraan ylhäältä näkyy nelisakarainen tähti (itä, länsi, etu ja taka), ja sivulta kallistettuna
        /// sama tähti pystyssä. Seisoo alakärjellään, ei jalustaa. Leveys 0,9, korkeus 0,9, syvyys 0,7.
        /// LOD1: samat sakarat ilman kylkipaksuutta.
        /// </summary>
        static void TahtiOsat(Rakentaja r, bool lod1)
        {
            var c = new Vector3(0f, ThPaa, 0f);
            // Väli-ilmansuunnat: ohuempi kerros, jonka harjanne jää pääsakaroiden kyljen taakse myös laaksoissa.
            ThKerros(r, c, Mathf.PI * 0.25f, ThVali, 0.07f, lod1 ? 0f : 0.012f, 0.032f, ThVaalea2, ThTumma2, ThKylki);
            ThKerros(r, c, 0f, ThPaa, 0.155f, lod1 ? 0f : 0.025f, 0.085f, ThVaalea, ThTumma, ThKylki);
            r.AloitaOsa();
            ThPiikki(r, c, 0.075f, -ThSyva);
            ThPiikki(r, c, 0.075f, ThSyva);
            r.LopetaOsa();
        }

        /// <summary>Pääsakaran pituus (tähden säde), väli-ilmansuunnan pituus ja syvyyssakaran pituus.</summary>
        const float ThPaa = 0.45f, ThVali = 0.3f, ThSyva = 0.35f;

        /// <summary>
        /// Tähtikerros tasossa z = c.z: neljä kärkeä säteellä rk kulmista a0 + k·π/2, laaksot säteellä rl niiden välissä,
        /// etu- ja takapinta harjanteina keskikärkiin syvyydellä ±d ja kylki, joka on laaksossa ±t ja ohenee kärkeen terävästi.
        /// Tahkot ovat yksi ääriviivaosa ja kylki sakaroittain omansa: kyljen etu- ja takareuna ovat osan syvyysrajoilla,
        /// joten ääriviiva kasvaa reunan molemmin puolin myös kallistettuna, ja kärki jää teräväksi (ei tylppää mustetta).
        /// </summary>
        static void ThKerros(Rakentaja r, Vector3 c, float a0, float rk, float rl, float t, float d, Color vaalea, Color tumma, Color kylki)
        {
            Vector3 P(float a, float rr, float z) => c + new Vector3(Mathf.Cos(a) * rr, Mathf.Sin(a) * rr, z);
            Vector3 etu = c + new Vector3(0f, 0f, -d), taka = c + new Vector3(0f, 0f, d);
            const float h = Mathf.PI * 0.25f;
            r.AloitaOsa();
            for (int k = 0; k < 4; k++)
            {
                float a = a0 + k * Mathf.PI * 0.5f;
                var karki = P(a, rk, 0f);
                Vector3 vE = P(a + h, rl, -t), vT = P(a + h, rl, t);   // vastapäivään
                Vector3 oE = P(a - h, rl, -t), oT = P(a - h, rl, t);   // myötäpäivään
                r.KolmioUlos(etu, karki, vE, Vector3.back, vaalea);
                r.KolmioUlos(etu, oE, karki, Vector3.back, tumma);
                r.KolmioUlos(taka, karki, vT, Vector3.forward, tumma);
                r.KolmioUlos(taka, oT, karki, Vector3.forward, vaalea);
            }
            r.LopetaOsa();
            if (t <= 0f) return;
            for (int k = 0; k < 4; k++)
            {
                float a = a0 + k * Mathf.PI * 0.5f;
                var karki = P(a, rk, 0f);
                r.AloitaOsa();
                r.KolmioKeskelta(karki, P(a + h, rl, -t), P(a + h, rl, t), c, kylki);
                r.KolmioKeskelta(karki, P(a - h, rl, -t), P(a - h, rl, t), c, kylki);
                r.LopetaOsa();
            }
        }

        /// <summary>Syvyyssakara: nelitahkoinen pyramidi, jonka pohja (vinoneliö, kärjet pääilmansuunnissa, puolikoko b) on
        /// tähden tasossa ja kärki syvyydellä z; tahkot vuorottelevat vaalea/tumma kuten sakaroiden puolikkaat.</summary>
        static void ThPiikki(Rakentaja r, Vector3 c, float b, float z, Color vaalea, Color tumma)
        {
            var karki = c + new Vector3(0f, 0f, z);
            Vector3[] p = { c + new Vector3(b, 0f, 0f), c + new Vector3(0f, b, 0f), c + new Vector3(-b, 0f, 0f), c + new Vector3(0f, -b, 0f) };
            for (int i = 0; i < 4; i++) r.KolmioKeskelta(p[i], p[(i + 1) % 4], karki, c, (i % 2 == 0) == (z < 0f) ? tumma : vaalea);
        }

        static void ThPiikki(Rakentaja r, Vector3 c, float b, float z) => ThPiikki(r, c, b, z, ThVaalea, ThTumma);

        static readonly Color ThVaalea = Ramppi(0xf4ecda), ThTumma = Ramppi(0xa98a5c), ThKylki = Ramppi(0xcbb48c);
        static readonly Color ThVaalea2 = Ramppi(0xe6d7b6), ThTumma2 = Ramppi(0x967550);

        static Mesh TahtiRunko() { var r = new Rakentaja(); TahtiOsat(r, false); return r.Verkko("kategoria-Tahti"); }
        static Mesh TahtiLod1() { var r = new Rakentaja(); TahtiOsat(r, true); return r.Verkko("kategoria-Tahti-lod1"); }

        /// <summary>Esikatselu (työkalut): LOD0 tai LOD1.</summary>
        public static Mesh KategoriaTahti3D(bool lod1 = false) => lod1 ? TahtiLod1() : TahtiRunko();

        static readonly bool tahtiMalli = RekisteroiKategoria(Kategoriasymboli.Tahti, new Erikoismalli { Runko = TahtiRunko, Lod1 = TahtiLod1 });
    }
}
