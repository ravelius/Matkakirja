// DIORAAMAN KAMERAN PEHMENNYS JA JATKUVA ORBIT (Siirtoseppä 5.10.2026; omistajan TF 141 -palaute klo 00.4x: "Linnan esittelyn
// kamera liikkeet ovat robottimaisia. Tee pehmeämmiksi. Lisäksi kameran liike ei saa pysähtyä koskaan täysin. Aina pitää olla
// pieni orbit panorointi käynnissä jos ei muuta liikettä").
//
// Ydin (PoikkileikkausLinssi.NakymaHetkella, Kameraliike) laskee asennon analyyttisesti ajasta: segmentit alkavat ja päättyvät
// nollanopeuteen, kertojan jaksot seisovat täysin paikallaan 13–21 s, ja kierroksen katko tai kohdistus kesken lennon hyppää
// edellisen kohteen lopputilaan. Ydintä ei muuteta (JS-pari js/dioraama/kamera.js ja kultaiset vektorit vartioivat sitä), vaan
// Unity-puoli suodattaa sen tuloksen:
//   Orbit — elliptinen rata (atsimuutti A·sin φ, korkeus B·cos φ, etäisyys 1 + C·sin 0,7φ) vakiovauhdilla: nopeus ei ole
//           koskaan nolla. Pelaajan kosketus jäädyttää vaiheen (offset jää, ei hyppyä), ja rata jatkuu pehmeästi irrotuksesta.
//   Askel — kriittisesti vaimennettu jousi koko tilavektorille (kohde, atsimuutti, korkeus, ln etäisyys, fov, aukko): ei
//           nykäyksiä segmenttien päissä eikä hyppyjä, kun Ydin vaihtaa kohdetta kesken lennon. Vedon aikana jousi on jäykkä,
//           jotta kamera seuraa sormea.
// Testikomento "poikki orbit 0|1" (kuvavertailut samalla kamerapolulla ilman orbitia).
using System;
using Matkakirja.Linssit.Dioraama;

namespace Matkakirja.Natiivi
{
    public sealed class DioraamaKameraJousi
    {
        /// <summary>Jousen aikavakio (s): kuinka paljon kamera jää Ytimen asennosta jälkeen tasaisessa liikkeessä.</summary>
        const double TauNormaali = 0.55, TauVeto = 0.08;
        /// <summary>Orbitin amplitudit (astetta, astetta, etäisyyden osuus) ja kierroksen kesto: atsimuutin huippunopeus
        /// A·2π/jakso ≈ 1,1°/s, pienimmilläänkin korkeus liikkuu B·2π/jakso ≈ 0,3°/s.</summary>
        const double OrbitA = 7.0, OrbitB = 1.8, OrbitC = 0.025, OrbitJaksoS = 40.0;
        /// <summary>Kosketus jäädyttää orbitin tässä ajassa ja vapautus palauttaa sen tässä ajassa (s).</summary>
        const double PainoAlasS = 0.3, PainoYlosS = 2.0;

        public static bool OrbitPaalla = true;

        readonly double[] x = new double[8], v = new double[8], tavoite = new double[8];
        bool alustettu;
        double vaihe, paino = 1;

        /// <summary>Seuraava Askel asettuu suoraan tavoitteeseen (saapumisen alku, pakotettu kamera, uusi avaus).</summary>
        public void Nollaa() => alustettu = false;

        /// <summary>Orbitin offset Ytimen asentoon. veto = pelaajan sormi ruudulla.</summary>
        public Asento Orbit(Asento a, float dt, bool veto, bool vahennettyLiike)
        {
            double h = Math.Min(Math.Max(dt, 0f), 0.1f);
            double kohde = veto || !OrbitPaalla ? 0 : 1;
            paino = kohde < paino ? Math.Max(kohde, paino - h / PainoAlasS) : Math.Min(kohde, paino + h / PainoYlosS);
            double p = paino * paino * (3 - 2 * paino); // smoothstep: vapautuksen jälkeen rata kiihtyy pehmeästi
            vaihe += 2 * Math.PI / OrbitJaksoS * p * h;
            if (vaihe > 1000) vaihe -= 2 * Math.PI * 100; // tarkkuus pitkässä istunnossa; 0,7 × 200π = 70 × 2π, joten kumpikaan termi ei hyppää
            double m = (OrbitPaalla ? 1.0 : 0.0) * (vahennettyLiike ? 0.5 : 1.0);
            return new Asento(a.Kohde, a.Atsimuutti + m * OrbitA * Math.Sin(vaihe), a.Korkeus + m * OrbitB * Math.Cos(vaihe),
                a.Etaisyys * (1 + m * OrbitC * Math.Sin(0.7 * vaihe)), a.Fov, a.Aukko, a.Kierto);
        }

        /// <summary>Jousen askel kohti tavoiteasentoa; palauttaa näytettävän asennon.</summary>
        public Asento Askel(Asento a, float dt, bool veto)
        {
            tavoite[0] = a.Kohde.X; tavoite[1] = a.Kohde.Y; tavoite[2] = a.Kohde.Z;
            tavoite[3] = a.Atsimuutti; tavoite[4] = a.Korkeus; tavoite[5] = Math.Log(Math.Max(a.Etaisyys, 1e-3));
            tavoite[6] = a.Fov; tavoite[7] = a.Aukko;
            if (!alustettu)
            {
                Array.Copy(tavoite, x, x.Length);
                Array.Clear(v, 0, v.Length);
                alustettu = true;
                return a;
            }
            // Atsimuutti lyhintä reittiä (359° → 1° on 2°, ei 358°).
            tavoite[3] = x[3] + (((tavoite[3] - x[3] + 180) % 360 + 360) % 360 - 180);
            double w = 2.0 / (veto ? TauVeto : TauNormaali);
            double kesto = Math.Min(Math.Max(dt, 0f), 0.1f);
            int n = Math.Max(1, (int)Math.Ceiling(kesto / 0.008));
            double hh = kesto / n;
            for (int k = 0; k < n; k++)
                for (int i = 0; i < x.Length; i++)
                {
                    v[i] += (w * w * (tavoite[i] - x[i]) - 2 * w * v[i]) * hh;
                    x[i] += v[i] * hh;
                }
            if (x[3] > 3600 || x[3] < -3600) x[3] %= 360; // ei kasva rajatta jatkuvassa kierrossa
            return new Asento(new Matkakirja.Linssit.Dioraama.V3(x[0], x[1], x[2]), x[3], x[4], Math.Exp(x[5]), x[6], x[7], a.Kierto);
        }
    }
}
