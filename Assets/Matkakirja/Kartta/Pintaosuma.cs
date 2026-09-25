using System.Collections.Generic;
using CesiumForUnity;
using Unity.Mathematics;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>
    /// Ruudun piste pallon pinnalle (ellipsoidin ekvaattorisäteen pallo, kuten MaaKartta.RuutuPallolle) ja siitä johdetut
    /// vektorikerrosten mitat: ruudun tiheys (webin nakyvaAlue: laitepikseliä leveysastetta kohti ruudun keskellä,
    /// mitattuna 40 pt:n matkalta alaspäin) ja näkyvä alue näyteruudukosta (webin LEPOKERROS_NAYTTEITA 7 × 7).
    /// Yhteinen Maarajalle ja Rannikolle (löydös 46).
    /// </summary>
    public static class Pintaosuma
    {
        /// <summary>Tiheyden mittamatka pisteinä (web LEPOKERROS_MITTAMATKA_PX).</summary>
        public const float MittamatkaPt = 40f;
        /// <summary>Näyteruudukon koko (web LEPOKERROS_NAYTTEITA).</summary>
        public const int Naytteita = 7;

        /// <summary>Näytön piste (pikseleinä, origo vasen alakulma) pinnalle: pituus- ja leveysaste. false = ohi pallon.</summary>
        public static bool Osuma(CesiumGeoreference g, Camera kamera, Vector2 ruutu, out double lon, out double lat)
        {
            lon = lat = 0;
            if (g == null || !PalloKierto.Sade(kamera, ruutu, out Ray r)) return false;
            var gt = g.transform;
            double3 keskus = g.TransformEarthCenteredEarthFixedPositionToUnity(double3.zero);
            double3 o = (float3)gt.InverseTransformPoint(r.origin);
            double3 s = math.normalize((double3)(float3)gt.InverseTransformDirection(r.direction));
            double3 oc = o - keskus;
            const double a = 6378137.0;
            double B = math.dot(oc, s), C = math.dot(oc, oc) - a * a;
            double D = B * B - C;
            if (D < 0 || -B - math.sqrt(D) < 0) return false;
            double3 osuma = o + s * (-B - math.sqrt(D));
            double3 ecef = g.TransformUnityPositionToEarthCenteredEarthFixed(osuma);
            double3 llh = CesiumWgs84Ellipsoid.EarthCenteredEarthFixedToLongitudeLatitudeHeight(ecef);
            lon = llh.x;
            lat = llh.y;
            return true;
        }

        /// <summary>Ruudun tiheys laitepikseleinä leveysastetta kohti ruudun keskellä; 0 = keskus ohi pallon (web).</summary>
        public static float Tiheys(CesiumGeoreference g, Camera kamera)
        {
            if (kamera == null) return 0f;
            float matka = MittamatkaPt * PalloKierto.Pistekerroin;
            var keski = new Vector2(Screen.width * 0.5f, Screen.height * 0.5f);
            if (!Osuma(g, kamera, keski, out _, out double lat0) || !Osuma(g, kamera, keski - new Vector2(0f, matka), out _, out double lat1))
                return 0f;
            double ero = math.abs(lat0 - lat1);
            return ero > 1e-6 ? (float)(matka / ero) : 0f;
        }

        /// <summary>
        /// Näkyvä alue (webin lepokerroksenAlue) 7 × 7 -näytteistä. Kallistetussa kuvassa yläosa osuu taivaalle: jokaisesta
        /// sarakkeesta, jonka ylin näyte menee ohi, haetaan puolitushaulla (6 askelta) horisontin viimeinen osuma, jotta
        /// horisontin puoleinen kaista ei jää alueen ulkopuolelle (web ohittaa sen; natiivissa kallistus on 85°:een).
        /// </summary>
        public static bool NakyvaAlue(CesiumGeoreference g, Camera kamera, double keskiLon, out Vektorisolut.Alue alue,
            List<(double, double)> puskuri = null)
        {
            alue = default;
            if (kamera == null || Screen.width <= 0 || Screen.height <= 0) return false;
            var naytteet = puskuri ?? new List<(double, double)>(Naytteita * Naytteita + Naytteita);
            naytteet.Clear();
            int N = Naytteita;
            float W = Screen.width, H = Screen.height;
            for (int i = 0; i < N; i++)
            {
                float x = W * i / (N - 1);
                float ylinOsuma = -1f, alinOhi = -1f;
                for (int j = 0; j < N; j++)
                {
                    float y = H * j / (N - 1);
                    if (Osuma(g, kamera, new Vector2(x, y), out double lon, out double lat))
                    {
                        naytteet.Add((lon, lat));
                        ylinOsuma = y;
                    }
                    else if (ylinOsuma >= 0f && alinOhi < 0f) alinOhi = y;
                }
                if (ylinOsuma < 0f || alinOhi < 0f) continue;
                float ala = ylinOsuma, yla = alinOhi;
                double hlon = 0, hlat = 0;
                bool loytyi = false;
                for (int k = 0; k < 6; k++)
                {
                    float y = 0.5f * (ala + yla);
                    if (Osuma(g, kamera, new Vector2(x, y), out double lon, out double lat)) { ala = y; hlon = lon; hlat = lat; loytyi = true; }
                    else yla = y;
                }
                if (loytyi) naytteet.Add((hlon, hlat));
            }
            return Vektorisolut.AlueNaytteista(naytteet, keskiLon, out alue);
        }
    }
}
