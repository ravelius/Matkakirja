// KAUPUNKIEN PUUT, YDIN (Linssiseppä 10.10.2026; Päätoimittaja 18.5x, juna 181): Karttasepän puut-<kohde>.bytes (puut-20261010,
// OSM natural=tree + Meta & WRI Canopy Height Maps) ruuduittain. Puhdas C#: otsakkeen ja ruututaulun jäsennys, ruudun puiden purku,
// ruutuvalinta kameran ympäriltä (lähin ensin), näkymäkartion testi ruudun laatikolle ja LOD etäisyydestä. Unity-osa
// Unity/KaupunkiPuut.cs (lataus ämpäristä, maanpinta DTM:stä, instanssit GraphicsBufferiin), varjostin Varjostimet/KaupunkiPuu.
// MUOTO (little endian, metan "muoto"): otsake 16 t 'PUU1' | uint16 ruutuja_x | uint16 ruutuja_y | float32 ruutu_m | uint32 puita;
// ruututaulu (ruutuja_x × ruutuja_y + 1) × uint32 = puuindeksin alku per ruutu (rivi y, sitten x; viimeinen = puita); puut 8 t:
// int16 x, int16 y (ENU 0,5 m; x itä, y pohjoinen), uint8 korkeus 0,25 m, uint8 latvus 0,1 m (halkaisija), uint8 tyyppi (bitit 0–1
// lehti: 0 tuntematon, 1 lehtipuu, 2 havupuu; bit 2 chm, bit 3 arvio), uint8 suku. Ruutu (i, j) alkaa (−säde + i·ruutu_m, −säde + j·ruutu_m).
// Koordinaatit kuten elävässä kaupungissa: X itä, Z pohjoinen (m, paketin origo = Karttasepän origo, sama kuin yövaloilla ja kaduilla).
// 11.10. (iPad-ajo 181): Muoto (runko ≤ 1/3, latvus loput), MaaPinnasta (tyvi DSM:stä 25 näytteellä), GooglellaPuu (Tukholma: Googlen puut ensin).
using System;
using System.Collections.Generic;

namespace Matkakirja.Linssit.Elava
{
    public sealed class PuuRuudukko
    {
        public const int OtsakeTavua = 16, PuuTavua = 8;
        /// <summary>Korkeus 0 = tuntematon → oletus; latvus 0 → LatvusKerroin × korkeus (LUEMINUT.md).</summary>
        public const float OletusKorkeusM = 8f, LatvusKerroin = 0.45f;
        /// <summary>Ämpärin kansio (vientipaketti tyokalut/kaupunki_puut_paketti.py → kartta/puut/v1/puut-&lt;id&gt;.bytes).</summary>
        public const string Juuri = "https://media.matkakirja.app/kartta/puut/v1/";
        public const string Krediitti = "Puut: © OpenStreetMap contributors (ODbL); Meta and World Resources Institute (WRI), High Resolution Canopy Height Maps, CC BY 4.0";
        /// <summary>Kaupungit, joiden puut ovat ämpärissä: origo = Karttasepän metan origo (sama kuin ElavaKaupunki.Paketit).
        /// GooglenPuut = Googlen laattojen puut ensin (<see cref="GooglellaPuu"/>): PT 11.10. Tukholma (iPad-ajo 181, t07 tuplalatvukset).</summary>
        public static readonly (string Id, double Lat, double Lon, long Tavua, bool GooglenPuut)[] Kaupungit =
            { ("pariisi", 48.86122, 2.35092, 4064212, false), ("tukholma", 59.3299, 18.07382, 8420972, true) };

        public int RuutujaX { get; private set; }
        public int RuutujaY { get; private set; }
        public float RuutuM { get; private set; }
        public int Puita { get; private set; }
        uint[] alut;
        public double X0 => -RuutujaX * (double)RuutuM * 0.5;
        public double Z0 => -RuutujaY * (double)RuutuM * 0.5;
        public int Ruutuja => RuutujaX * RuutujaY;
        /// <summary>Otsake + ruututaulu tavuina (puiden alku tiedostossa).</summary>
        public long PuidenAlku => OtsakeTavua + (Ruutuja + 1) * 4L;
        public long TiedostonKoko => PuidenAlku + (long)Puita * PuuTavua;

        public struct Puu
        {
            public float X, Z, KorkeusM, LatvusM; public byte Tyyppi, Suku;
            /// <summary>Korkeus datassa (OSM-tagi tai latvusmallin huippu); false = oletus <see cref="OletusKorkeusM"/>.</summary>
            public bool KorkeusTunnettu;
            public bool Havu => (Tyyppi & 3) == 2;
            public bool Lehti => (Tyyppi & 3) == 1;
            /// <summary>Lähde latvusmalli (bitti 2): latvushuippu ilmakuvasta, ei OSM-puuta 4 m:n säteellä.</summary>
            public bool Chm => (Tyyppi & 4) != 0;
        }

        /// <summary>Ruututaulun pituus tavuina 16 tavun otsakkeesta (lukija lukee sen jälkeen taulun); heittää, jos otsake ei ole PUU1.</summary>
        public static int TauluTavua(byte[] otsake)
        {
            if (otsake == null || otsake.Length < OtsakeTavua || otsake[0] != 'P' || otsake[1] != 'U' || otsake[2] != 'U' || otsake[3] != '1')
                throw new FormatException("ei PUU1-otsaketta");
            int nx = otsake[4] | otsake[5] << 8, ny = otsake[6] | otsake[7] << 8;
            if (nx <= 0 || ny <= 0 || nx > 1024 || ny > 1024) throw new FormatException($"ruutuja {nx}×{ny}");
            return (nx * ny + 1) * 4;
        }

        /// <summary>Otsake ja ruututaulu (vähintään PuidenAlku tavua tiedoston alusta; koko tiedostokin käy).</summary>
        public static PuuRuudukko Lue(byte[] alku)
        {
            int taulu = TauluTavua(alku);
            if (alku.Length < OtsakeTavua + taulu) throw new FormatException("ruututaulu vajaa");
            var r = new PuuRuudukko
            {
                RuutujaX = alku[4] | alku[5] << 8, RuutujaY = alku[6] | alku[7] << 8,
                RuutuM = BitConverter.ToSingle(alku, 8), Puita = (int)BitConverter.ToUInt32(alku, 12)
            };
            if (!(r.RuutuM > 1f && r.RuutuM < 100000f) || r.Puita < 0) throw new FormatException("ruutu_m tai puita virheellinen");
            r.alut = new uint[r.Ruutuja + 1];
            for (int i = 0; i <= r.Ruutuja; i++) r.alut[i] = BitConverter.ToUInt32(alku, OtsakeTavua + 4 * i);
            if (r.alut[r.Ruutuja] != (uint)r.Puita) throw new FormatException($"ruututaulun loppu {r.alut[r.Ruutuja]} ≠ puita {r.Puita}");
            for (int i = 0; i < r.Ruutuja; i++) if (r.alut[i + 1] < r.alut[i]) throw new FormatException("ruututaulu ei kasva");
            return r;
        }

        public int Alku(int ruutu) => (int)alut[ruutu];
        public int Maara(int ruutu) => (int)(alut[ruutu + 1] - alut[ruutu]);
        /// <summary>Ruudun puiden tavusiirto tiedoston alusta.</summary>
        public long Siirto(int ruutu) => PuidenAlku + (long)alut[ruutu] * PuuTavua;
        public int Ruutu(int i, int j) => j * RuutujaX + i;
        public (double X0, double Z0, double X1, double Z1) Alue(int ruutu)
        {
            int i = ruutu % RuutujaX, j = ruutu / RuutujaX;
            double x0 = X0 + i * (double)RuutuM, z0 = Z0 + j * (double)RuutuM;
            return (x0, z0, x0 + RuutuM, z0 + RuutuM);
        }

        /// <summary>Puiden purku: n puuta tavutaulusta kohdasta alku (8 t / puu) → ulos[ulosAlku…]. Oletuskorkeus ja -latvus täytetään.</summary>
        public static void Pura(byte[] b, int alku, int n, Puu[] ulos, int ulosAlku = 0)
        {
            for (int k = 0; k < n; k++)
            {
                int o = alku + k * PuuTavua;
                short x = (short)(b[o] | b[o + 1] << 8), y = (short)(b[o + 2] | b[o + 3] << 8);
                float h = b[o + 4] * 0.25f, l = b[o + 5] * 0.1f;
                bool tunnettu = h > 0f;
                if (!tunnettu) h = OletusKorkeusM;
                if (l <= 0f) l = LatvusKerroin * h;
                ulos[ulosAlku + k] = new Puu { X = x * 0.5f, Z = y * 0.5f, KorkeusM = h, LatvusM = l, Tyyppi = b[o + 6], Suku = b[o + 7], KorkeusTunnettu = tunnettu };
            }
        }

        /// <summary>Lyhin vaakaetäisyys pisteestä ruudun suorakulmioon (0 sisällä).</summary>
        public double Etaisyys(int ruutu, double x, double z)
        {
            var a = Alue(ruutu);
            double dx = Math.Max(0, Math.Max(a.X0 - x, x - a.X1)), dz = Math.Max(0, Math.Max(a.Z0 - z, z - a.Z1));
            return Math.Sqrt(dx * dx + dz * dz);
        }

        /// <summary>RUUTUVALINTA: ruudut, joiden suorakulmio on säteen sisällä pisteestä (x, z), lähin ensin (tyhjät ohitetaan).</summary>
        public List<int> Ruudut(double x, double z, double sadeM, List<int> ulos = null)
        {
            ulos ??= new List<int>(); ulos.Clear();
            int i0 = Math.Max(0, (int)Math.Floor((x - sadeM - X0) / RuutuM)), i1 = Math.Min(RuutujaX - 1, (int)Math.Floor((x + sadeM - X0) / RuutuM));
            int j0 = Math.Max(0, (int)Math.Floor((z - sadeM - Z0) / RuutuM)), j1 = Math.Min(RuutujaY - 1, (int)Math.Floor((z + sadeM - Z0) / RuutuM));
            var et = new List<(double d, int r)>();
            for (int j = j0; j <= j1; j++)
                for (int i = i0; i <= i1; i++)
                {
                    int r = Ruutu(i, j);
                    if (Maara(r) == 0) continue;
                    double d = Etaisyys(r, x, z);
                    if (d <= sadeM) et.Add((d, r));
                }
            et.Sort((a, b) => a.d != b.d ? a.d.CompareTo(b.d) : a.r.CompareTo(b.r));
            foreach (var e in et) ulos.Add(e.r);
            return ulos;
        }

        /// <summary>NÄKYMÄKARTIO: laatikko [x0,x1]×[y0,y1]×[z0,z1] näkyy, ellei se ole kokonaan jonkin tason takana. tasot = 6 × (nx, ny, nz, d),
        /// normaali sisäänpäin (Unityn GeometryUtility.CalculateFrustumPlanes: piste näkyy, kun n·p + d ≥ 0); vara m laajentaa.</summary>
        public static bool Nakyvissa(float[] tasot, double x0, double y0, double z0, double x1, double y1, double z1, double vara = 0)
        {
            for (int t = 0; t + 3 < tasot.Length; t += 4)
            {
                double nx = tasot[t], ny = tasot[t + 1], nz = tasot[t + 2], d = tasot[t + 3];
                // Positiivinen kärki (normaalin suuntaan kaukaisin): jos sekin on tason takana, koko laatikko on.
                double px = nx >= 0 ? x1 : x0, py = ny >= 0 ? y1 : y0, pz = nz >= 0 ? z1 : z0;
                if (nx * px + ny * py + nz * pz + d < -vara) return false;
            }
            return true;
        }

        /// <summary>LOD: 0 = lähipuu (latvus + runko), 1 = kaukopuu (pelkkä latvus), 2 = ei piirretä (Googlen laatat riittävät).</summary>
        public static int Lod(double etaisyysM, double lahiM, double kaukoM) => etaisyysM < lahiM ? 0 : etaisyysM < kaukoM ? 1 : 2;

        /// <summary>Instanssin koodi varjostimelle (uint): bitit 0–7 korkeus 0,25 m, 8–15 latvus 0,1 m (rajattu 0,3–1,2 × korkeus:
        /// latvusmallin karsintasäde ei ole latvus), 16–17 lehti/havu, 18–31 vaihtelu puun paikasta (värisävy, tuulen vaihe).</summary>
        public static uint Koodi(in Puu p)
        {
            float h = Math.Min(63.75f, Math.Max(1f, p.KorkeusM));
            float l = Math.Min(25.5f, Math.Max(0.3f * h, Math.Min(1.2f * h, p.LatvusM)));
            uint kh = (uint)Math.Min(255, Math.Max(1, (int)Math.Round(h / 0.25f))), kl = (uint)Math.Min(255, Math.Max(1, (int)Math.Round(l / 0.1f)));
            uint s = unchecked((uint)(int)Math.Round(p.X * 2) * 73856093u ^ (uint)(int)Math.Round(p.Z * 2) * 19349663u);
            s ^= s >> 13; s = unchecked(s * 0x5bd1e995u); s ^= s >> 15;
            return kh | kl << 8 | (uint)(p.Tyyppi & 3) << 16 | (s & 0x3FFFu) << 18;
        }

        /// <summary>RUNKO JA LATVUS (iPad-ajo 181, 11.10.: rungot pitkiä ja ohuita, latvukset ilmassa): latvus on puun yläosa, näkyvä runko
        /// enintään kolmannes korkeudesta. Lehtipuu: latvus 0,7 × korkeus, leveys 0,5–1,2 × korkeus (OSM-oletus 0,45 × h oli kapea, ja vanha
        /// 0,6 × h rajattuna 1,2 × leveyteen jätti rungon jopa 0,64 × h:ksi); havupuu: latvus 0,8 × h, leveys 0,3–0,6 × h. Varjostin
        /// KaupunkiPuu laskee saman (LatvusK / LatvusL); RunkoM = latvuksen alareuna tyvestä.</summary>
        public const float LehtiLatvus = 0.7f, HavuLatvus = 0.8f;
        public static (float LatvusL, float LatvusK, float RunkoM) Muoto(float h, float l, bool havu)
        {
            float lk = h * (havu ? HavuLatvus : LehtiLatvus);
            float ll = havu ? Math.Min(0.6f * h, Math.Max(0.3f * h, l)) : Math.Min(1.2f * h, Math.Max(0.5f * h, l));
            return (ll, lk, h - lk);
        }

        /// <summary>TYVI PINTAMALLISTA (DSM), kun maanpintaa (DTM) ei ole pisteessä: DSM:ssä puu on latvassa, joten maa haetaan ympäriltä.
        /// Vanha 4 suunnan kehä latvuksen säteellä osui tiheässä puurivissä ja puistossa naapurilatvuksiin (iPad-ajo 181: 41 015 / 65 247 puuta
        /// DSM-kehältä, latvukset ilmassa). Nyt 25 näytettä: piste + 8 suuntaa × 3 kehää (latvus/2 + 3 m, max(12, latvus + 6), max(25, 2·latvus + 10))
        /// ja toiseksi pienin (yksittäinen kuoppa, esim. laiturin alla joki, ei vedä puuta alas). Pariisin DTM-alueella mitattuna (3 % näyte,
        /// LiDAR-DSM 2 m): yli 5 m ilmassa 12,2 % → 0,3 %, yli 5 m maan alla 0,2 % → 2,7 % (DSM 10 m: 26 % → 2,5 %). NaN = ei pintaa.</summary>
        public static double MaaPinnasta(Func<double, double, double> pinta, double x, double z, float latvusM)
        {
            double pienin = double.PositiveInfinity, toinen = double.PositiveInfinity;
            void Lisaa(double h)
            {
                if (double.IsNaN(h)) return;
                if (h < pienin) { toinen = pienin; pienin = h; } else if (h < toinen) toinen = h;
            }
            Lisaa(pinta(x, z));
            double l = latvusM;
            for (int k = 0; k < 3; k++)
            {
                double r = k == 0 ? l * 0.5 + 3 : k == 1 ? Math.Max(12, l + 6) : Math.Max(25, 2 * l + 10);
                for (int s = 0; s < 8; s++) Lisaa(pinta(x + Suunnat[s].x * r, z + Suunnat[s].z * r));
            }
            return !double.IsInfinity(toinen) ? toinen : !double.IsInfinity(pienin) ? pienin : double.NaN;
        }
        static readonly (double x, double z)[] Suunnat =
            { (1, 0), (-1, 0), (0, 1), (0, -1), (0.70711, 0.70711), (-0.70711, 0.70711), (0.70711, -0.70711), (-0.70711, -0.70711) };

        /// <summary>GOOGLEN PUUT ENSIN (PT 11.10., Tukholma t07: omat latvukset Googlen sulaneiden puiden päällä tuplana; Googlen laattoihin ei
        /// kosketa): puu jätetään piirtämättä, kun sen latvus on nähty ilmasta, jolloin Googlen ilmakuvista tehdyssä laatassa on puu samassa
        /// kohdassa: latvusmallin puu (Meta/WRI-huippu satelliittikuvasta) tai OSM-puu, jonka korkeus on datassa (Tukholmassa 98 OSM-tagia,
        /// muut latvusmallin huipusta 3 m:n säteeltä, ≥ 3 m). Jäljelle jäävät OSM-puut, joiden kohdalla latvusmalli ei nähnyt latvusta (nuoret,
        /// uudet; Tukholmassa 4 026). Pintamallista tätä ei voi päätellä: Tukholman DSM on GLO-30 (30 m tutka) + OSM-rakennukset, ja
        /// Kungsträdgårdenissa DSM − maa ≈ 0 puiden kohdalla. Ei näytteitä: pelkkä bittitesti latauksessa.</summary>
        public static bool GooglellaPuu(in Puu p) => p.Chm || p.KorkeusTunnettu;

        public static float KoodiKorkeus(uint k) => (k & 255) * 0.25f;
        public static float KoodiLatvus(uint k) => (k >> 8 & 255) * 0.1f;
    }
}
