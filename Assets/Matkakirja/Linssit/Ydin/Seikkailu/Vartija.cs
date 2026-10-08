// HISTORIAMOOTTORI V3: VARTIJAN AIVOT (Siirtoseppä 7.10.2026; arkkitehtuuri docs/raportit/siirtoseppa-historiamoottori-20261007.md
// kohta 11: hiiviskely vartijan ohi, harhautus heitolla). Puhdas ydin: päätökset ja mittarit; Unity-sovitin (V3b) liikuttaa vartijaa
// NavMeshillä Kohteeseen, kertoo näkölinjan (säde), pelaajan valoisuuden ja äänet, ja soittaa leikkeet (partio, etsi, juoksu).
// Tilat: Partio (reitti partio:<osa>-N merkeistä, odotus pisteissä) → Epaily (pysähtyy, kääntyy ärsykkeeseen, havaintomittari nousee)
// → Etsinta (kävelee viimeiseen havainto- tai äänipaikkaan ja katselee) → Paluu (lähimpään partiopisteeseen) → Partio; täysi mittari
// = Kiinni (pelaaja tarkistuspisteeseen). Kaikki vaakatasossa (x, z), metreinä ja sekunteina; yaw 0 = +z, myötäpäivään (kuten Kavely).
using System;
using System.Collections.Generic;

namespace Matkakirja.Linssit.Seikkailu
{
    public enum VartijanTila { Partio, Epaily, Etsinta, Paluu, Kiinni, Etsii, Halytys }

    /// <summary>Hahmoprofiili (pelattavuusmalli 7.10. kohta 3.1): näkö, kulma, kuulo, jahti ja kiinniotto; partio:-merkin kenttä profiili.</summary>
    public sealed class VartijaProfiili
    {
        public string Nimi = "vartija";
        public double NakoM = 10, NakoKulma = 55;
        public bool Havaitsee = true, Kuulee = true, Ottaa = true;
        /// <summary>Tarjotin on kulkulupa (pelattavuusmalli 2.4/8.1): kävelijää tarjotin kädessä ei epäillä. Kokki epäilee silti.</summary>
        public bool TarjotinLupa = true;
        /// <summary>Naamio (pelattavuusmalli 8.2 huone 6: esiliina ja myssy) on kulkulupa kuten tarjotin; kokki tuntee väkensä.</summary>
        public bool NaamioLupa = true;
        /// <summary>Tunnistaa naamioituneen, kun tämä on alle TunnistaaM:n päässä yli TunnistaaS (apulainen 2 m, 2 s; 0 = ei tunnista).</summary>
        public double TunnistaaM, TunnistaaS;
        /// <summary>Jahtinopeus m/s; 0 = ei jahtaa (kokki huutaa paikaltaan, apulainen).</summary>
        public double JahtaaMs = 2.2;

        public static readonly VartijaProfiili Vartija = new VartijaProfiili();
        public static readonly VartijaProfiili Portinvartija = new VartijaProfiili { Nimi = "portinvartija" };
        public static readonly VartijaProfiili Kokki = new VartijaProfiili { Nimi = "kokki", NakoM = 6, NakoKulma = 45, JahtaaMs = 0, Ottaa = false, TarjotinLupa = false, NaamioLupa = false };
        public static readonly VartijaProfiili Apulainen = new VartijaProfiili { Nimi = "apulainen", NakoM = 5, NakoKulma = 45, Kuulee = false, JahtaaMs = 0, Ottaa = false, TunnistaaM = 2, TunnistaaS = 2 };
        /// <summary>Linnaväki (huone 6: syövät ja noppaa pelaavat): näkee ja huutaa, ei jahtaa eikä ota kiinni; naamio kelpaa.</summary>
        public static readonly VartijaProfiili Linnavaki = new VartijaProfiili { Nimi = "linnavaki", NakoM = 7, NakoKulma = 50, JahtaaMs = 0, Ottaa = false };
        public static readonly VartijaProfiili Renki = new VartijaProfiili { Nimi = "renki", Havaitsee = false, Kuulee = false, JahtaaMs = 0, Ottaa = false };
        /// <summary>Torkkuva vartija (muuriportaiden juurella): torkkuessa ei näe, kävelyn ääni herättää (nousee 1,5 s), syödessä näkee
        /// vain katsejaksoissa (pää alas 6 s, katse 3 s); muuten kuin vartija.</summary>
        public static readonly VartijaProfiili Torkku = new VartijaProfiili { Nimi = "torkku" };

        public static VartijaProfiili Hae(string nimi) => nimi switch
        {
            "portinvartija" => Portinvartija, "kokki" => Kokki, "apulainen" => Apulainen, "renki" => Renki, "vesipoika" => Renki, "torkku" => Torkku,
            "linnavaki" => Linnavaki, _ => Vartija,
        };
    }

    /// <summary>Ääni maailmassa (heitetty esine, juoksuaskel): paikka ja kuuluvuus metreinä (kuuluu, jos etäisyys ≤ kuuluvuus).</summary>
    public readonly struct Aanilahde
    {
        public readonly double X, Z, KuuluvuusM;
        /// <summary>Kävelyosa, jossa ääni syntyi (seinäsääntö, Askelaani.Kuuluvuus); null = ei tiedossa.</summary>
        public readonly string Osa;
        public Aanilahde(double x, double z, double kuuluvuusM, string osa = null) { X = x; Z = z; KuuluvuusM = kuuluvuusM; Osa = osa; }
    }

    /// <summary>Yhden kehyksen havaintosyöte sovittimelta.</summary>
    public struct VartijanSyote
    {
        public double VartijaX, VartijaZ, PelaajaX, PelaajaZ;
        /// <summary>Säde vartijan silmistä pelaajan rintaan osuu vain pelaajaan (ei seinää).</summary>
        public bool NakolinjaVapaa;
        /// <summary>Pelaajan valoisuus 0 (pimeä) … 1 (soihdun valossa).</summary>
        public double Valoisuus;
        public bool Hiipii, Piilossa;
        public List<Aanilahde> Aanet;
        /// <summary>Pelaajan vauhti m/s (liikekerroin: paikallaan × 0,8, kävellen × 1, juosten × 1,25); null = ei tiedossa (× 1).</summary>
        public double? PelaajaVauhti;
        /// <summary>Pelaajalla tarjotin kädessä (kulkulupa: ei epäilyä, jos ei juokse eikä kyyristele).</summary>
        public bool Tarjotin;
        /// <summary>Pelaaja naamioitunut palvelijaksi (esiliina ja myssy): kulkulupa kuten tarjotin, apulainen tunnistaa läheltä.</summary>
        public bool Naamio;
    }

    public sealed class Vartija
    {
        public const double NakoKulma = 55, NakoM = 10, LahiM = 2.0, EpailyRaja = 0.3, MittariLaskuS = 0.25, KiinniM = 1.2;
        public const double EtsintaKatseluS = 6, EpailyUnohdusS = 2.0, PerillaM = 0.6, KavelyMs = 1.2, KiireMs = 2.2, KaantoAsteS = 160;
        // Pelattavuusmalli 7.10. kohta 3.3–3.4: vaihe 3 Etsii (2 lähintä piiloa ≤ 6 m, 15 s), vaihe 4 Hälytys (jahti ≤ 20 s, huuto kun näkö
        // katkennut 3 s), valppaus 60 s (raja 0,2, näkö 12 m, lasku 0,15/s, odotus −1 s), varoitus ennen kiinniottoa (vaiheissa 1–4 ≥ 1,5 s,
        // merkki annettu, sydän lyönyt ≥ 1 s), sydän (mittari ≥ 0,6, jahti, tai etsii/tutkii alle 4 m; loppuu 2 s vaaran jälkeen).
        public const double EtsiiS = 15, EtsiiM = 6, EtsiiKatseluS = 2.5, HalytysS = 20, HuutoS = 3, ValppausS = 60;
        public const double ValpasRaja = 0.2, ValpasNakoM = 12, ValpasLaskuS = 0.15, VaroitusS = 1.5, SydanVahS = 1.0, SydanLoppuS = 2.0, SydanM = 4;
        public const double TutkiHuippu = 0.6;

        public VartijaProfiili Profiili = VartijaProfiili.Vartija;
        /// <summary>Piilot ja varjot vaiheen 3 etsintään (sovitin antaa piilo:-merkeistä).</summary>
        public List<(double X, double Z)> Piilot = new List<(double, double)>();
        /// <summary>Anteeksianto (kohta 4.2): toinen kiinnijäänti samassa huoneessa → näkö −15 %, epäilyraja 0,4.</summary>
        public bool Helpotettu;
        /// <summary>Valppautta jäljellä (s).</summary>
        public double Valppaus { get; private set; }
        /// <summary>Hälytyshuuto pyydetty (sovitin soittaa repliikin ja kutsuu muut; nollaa itse).</summary>
        public bool Huuto { get; set; }
        /// <summary>Sydämen lyönti (s) ja tempo (lyöntiä/min; 0 = ei sydäntä).</summary>
        public double SydanS { get; private set; }
        public double SydanTempo { get; private set; }
        /// <summary>Varoitus annettu (merkki, aika vaiheissa 1–4, sydän): vasta sitten kiinniotto.</summary>
        public bool Varoitettu => varoitusS >= VaroitusS && merkki && SydanS >= SydanVahS;
        double varoitusS, sydanLoppuS, huippu, etsiiS, halytysS, eiNaeS; bool merkki, huudettu; readonly List<(double X, double Z)> etsittavat = new List<(double, double)>();
        double Raja => Helpotettu ? 0.4 : Valppaus > 0 ? ValpasRaja : EpailyRaja;
        // Irtipääsy (kohta 3.4, omistajan päätös 1 suosituksen mukaan): otteen jälkeen 1,0 s:n ikkuna, toiminto → hahmo horjahtaa ja
        // pelaaja saa 3 s etumatkan; kerran per hahmo 60 sekunnissa.
        public const double IrtiIkkunaS = 1.0, HorjahdusS = 3.0, IrtiValiS = 60;
        public const double NousuS = 1.5, SyoAlasS = 6, SyoKatseS = 3;
        /// <summary>Torkkuu (profiili torkku): ei näe; ääni herättää. Syö: näkee vain katsejaksoissa.</summary>
        public bool Torkkuu, Syo;
        // Riidan ikkuna (pelattavuusmalli 8.1 huone 2): portinvartija riitelee soutajan kanssa 12 s selin porttiin, näkö 4 m ±35°.
        public const double RiitaS = 12, RiitaNakoM = 4, RiitaKulma = 35;
        public double Riita { get; private set; }
        double riitaX, riitaZ;
        /// <summary>Riita alkaa (sovitin: soutaja-2 → portinvartija-riita-1 → -2): katse kohti riitapistettä, näkö kapea ja lyhyt.</summary>
        public void AloitaRiita(double x, double z, double kesto = RiitaS) { if (Tila != VartijanTila.Partio) return; Riita = kesto; riitaX = x; riitaZ = z; }
        double syoKello;
        /// <summary>Syödessä katse ylhäällä (katsejakso 3 s yhdeksästä).</summary>
        public bool SyoKatsoo => Syo && syoKello % (SyoAlasS + SyoKatseS) >= SyoAlasS;
        double kello, viimeIrti = double.NegativeInfinity, horjahdus;
        /// <summary>Aika otteesta (s), kun Tila = Kiinni.</summary>
        public double OteS { get; private set; }
        /// <summary>Horjuu tai nousee (irtipääsy, torkkujan herääminen): sovitin soittaa nousu_istumasta torkkujalle.</summary>
        public bool Horjuu => horjahdus > 0;

        /// <summary>Ote ilman jahtia (huone 6: vouti tarttuu ranteeseen, kun avaimia otetaan hänen katsoessaan): irtipääsyn ikkuna alkaa.</summary>
        public void OtaKiinni() { Tila = VartijanTila.Kiinni; OteS = 0; Vauhti = 0; }

        /// <summary>Pelaaja kiertyy irti otteesta: onnistuu ikkunan aikana kerran 60 s:ssa. Hahmo horjahtaa (3 s) ja jatkaa jahtia.</summary>
        public bool Irrottaudu()
        {
            if (Tila != VartijanTila.Kiinni || OteS > IrtiIkkunaS || kello - viimeIrti < IrtiValiS) return false;
            viimeIrti = kello; horjahdus = HorjahdusS; Tila = VartijanTila.Halytys; halytysS = 0; Vauhti = 0;
            return true;
        }

        readonly List<(double X, double Z, double OdotaS)> reitti;
        int piste; double odotus;
        double rauhaS, katseluS;
        public VartijanTila Tila { get; private set; } = VartijanTila.Partio;
        /// <summary>Havaintomittari 0…1 (1 = kiinni).</summary>
        public double Mittari { get; private set; }
        /// <summary>NavMeshin kohde ja haluttu vauhti (0 = seisoo).</summary>
        public double KohdeX { get; private set; }
        public double KohdeZ { get; private set; }
        public double Vauhti { get; private set; }
        /// <summary>Katseen suunta (yaw asteina); sovitin kääntää vartijan tähän, kun se seisoo.</summary>
        public double Yaw { get; set; }
        public double EpailyX { get; private set; }
        public double EpailyZ { get; private set; }

        public Vartija(IReadOnlyList<(double X, double Z, double OdotaS)> partioreitti, double yaw = 0)
        {
            reitti = new List<(double, double, double)>(partioreitti ?? Array.Empty<(double, double, double)>());
            Yaw = yaw;
            if (reitti.Count > 0) { KohdeX = reitti[0].X; KohdeZ = reitti[0].Z; }
        }

        static double Kulma(double a) => ((a + 180) % 360 + 360) % 360 - 180;
        static double Suunta(double dx, double dz) => Math.Atan2(dx, dz) * 180 / Math.PI;

        /// <summary>Näkeekö vartija pelaajan nyt ja kuinka voimakkaasti (0…1 per sekunti mittariin).</summary>
        public double NakoVoima(in VartijanSyote s)
        {
            if (s.Piilossa || !s.NakolinjaVapaa || !Profiili.Havaitsee) return 0;
            if (Torkkuu && !SyoKatsoo) return 0;
            if (s.Tarjotin && Profiili.TarjotinLupa && !s.Hiipii && (s.PelaajaVauhti ?? 0) < 2.5 && Tila != VartijanTila.Halytys) return 0;
            if (s.Naamio && Profiili.NaamioLupa && !s.Hiipii && (s.PelaajaVauhti ?? 0) < 2.5 && Tila != VartijanTila.Halytys && !Tunnisti) return 0;
            double dx = s.PelaajaX - s.VartijaX, dz = s.PelaajaZ - s.VartijaZ, d = Math.Sqrt(dx * dx + dz * dz);
            double nako = Riita > 0 ? RiitaNakoM : Valppaus > 0 ? Math.Max(Profiili.NakoM, ValpasNakoM * Profiili.NakoM / NakoM) : Profiili.NakoM;
            double liike = s.PelaajaVauhti is double pv ? (pv < 0.15 ? 0.8 : pv > 2.5 ? 1.25 : 1.0) : 1.0;
            double ulottuma = nako * (0.35 + 0.65 * Math.Max(0, Math.Min(1, s.Valoisuus))) * (s.Hiipii ? 0.7 : 1) * liike * (Helpotettu ? 0.85 : 1);
            if (d > ulottuma) return 0;
            double ero = Math.Abs(Kulma(Suunta(dx, dz) - Yaw));
            bool lahella = d < LahiM && Riita <= 0;         // aivan vieressä vartija tuntee pelaajan selkänsäkin takaa (ei riidan tuoksinassa)
            double kulma = Riita > 0 ? RiitaKulma : Profiili.NakoKulma;
            if (ero > kulma && !lahella) return 0;
            double keskelle = ero <= kulma ? 1 - 0.5 * ero / kulma : 0.35;
            double lahelle = 1 - d / ulottuma;
            // E1-ajo 7.10.: 3 m:stä kiinni 0,3 s:ssa ei jättänyt reaktioaikaa. Nyt kaukaa reunalta ~0,1/s, läheltä edestä ~0,85/s
            // (epäily ~0,35 s, täysi ~1,2 s), sitten takaa-ajo (Etsinta pelaajaan) ja kiinni vasta KiinniM:n päässä.
            return (0.2 + 0.65 * lahelle) * keskelle;
        }

        double tunnistusS;
        /// <summary>Apulainen on ollut naamioituneen vieressä tarpeeksi kauan ("Kuka sinä olet?"): naamio ei enää suojaa häneltä.</summary>
        public bool Tunnisti => Profiili.TunnistaaS > 0 && tunnistusS >= Profiili.TunnistaaS;

        public void Paivita(double dt, VartijanSyote s)
        {
            kello += dt;
            if (Profiili.TunnistaaM > 0)
            {
                double tx = s.PelaajaX - s.VartijaX, tz = s.PelaajaZ - s.VartijaZ;
                bool lahella = s.Naamio && s.NakolinjaVapaa && !s.Piilossa && tx * tx + tz * tz < Profiili.TunnistaaM * Profiili.TunnistaaM;
                tunnistusS = lahella ? tunnistusS + dt : Tunnisti && s.Naamio ? tunnistusS : 0;   // tunnistettu pysyy, kunnes naamio riisutaan
            }
            if (Tila == VartijanTila.Kiinni) { Vauhti = 0; OteS += dt; return; }
            if (horjahdus > 0) { horjahdus -= dt; Vauhti = 0; return; }
            if (Riita > 0)
            {
                // Riidan aikana seisoo ja katsoo riitapistettä; havainto katkaisee riidan (epäily alkaa tavallisesti).
                Riita -= dt;
                if (Tila != VartijanTila.Partio || Mittari >= Raja) Riita = 0;
                else { Vauhti = 0; Kaanny(dt, Suunta(riitaX - s.VartijaX, riitaZ - s.VartijaZ)); double vr = NakoVoima(s); if (vr > 0) { Mittari = Math.Min(1, Mittari + vr * dt); EpailyX = s.PelaajaX; EpailyZ = s.PelaajaZ; } else Mittari = Math.Max(0, Mittari - MittariLaskuS * dt); if (Mittari < Raja) return; Riita = 0; }
            }
            if (Torkkuu)
            {
                // Torkkuva vartija istuu: syödessä katsejaksot, ääni herättää (nousee NousuS), täysi mittari herättää jahtiin.
                Vauhti = 0; if (Syo) syoKello += dt;
                bool herasi = false;
                if (s.Aanet != null)
                    foreach (var a in s.Aanet)
                    {
                        double dx = a.X - s.VartijaX, dz = a.Z - s.VartijaZ;
                        if (dx * dx + dz * dz <= a.KuuluvuusM * a.KuuluvuusM) { herasi = true; EpailyX = a.X; EpailyZ = a.Z; break; }
                    }
                double vk = NakoVoima(s);
                if (vk > 0) { Mittari = Math.Min(1, Mittari + vk * dt); EpailyX = s.PelaajaX; EpailyZ = s.PelaajaZ; if (Mittari >= Raja) herasi = true; }
                else Mittari = Math.Max(0, Mittari - MittariLaskuS * dt);
                if (!herasi) return;
                Torkkuu = false; Syo = false; horjahdus = NousuS; AloitaVaihe(VartijanTila.Etsinta); merkki = true; rauhaS = 0;
                return;
            }
            if (Valppaus > 0) Valppaus = Math.Max(0, Valppaus - dt);
            double voima = NakoVoima(s);
            double dp = Etaisyys(s.VartijaX, s.VartijaZ, s.PelaajaX, s.PelaajaZ);
            if (voima > 0) { Mittari = Math.Min(1, Mittari + voima * dt); EpailyX = s.PelaajaX; EpailyZ = s.PelaajaZ; rauhaS = 0; eiNaeS = 0; }
            else { Mittari = Math.Max(0, Mittari - (Valppaus > 0 ? ValpasLaskuS : MittariLaskuS) * dt); rauhaS += dt; eiNaeS += dt; }
            bool valpas = Tila != VartijanTila.Partio && Tila != VartijanTila.Paluu;
            if (valpas) { varoitusS += dt; huippu = Math.Max(huippu, Mittari); }
            // Sydän (kohta 3.4): mittari ≥ 0,6, jahti, tai tutkii/etsii alle 4 m:n päässä; tempo 70 → 120 mittarin 0,6 → 1,0 mukaan.
            bool sydan = Profiili.Havaitsee && (Mittari >= TutkiHuippu || Tila == VartijanTila.Halytys
                || (Tila == VartijanTila.Etsinta || Tila == VartijanTila.Etsii) && dp < SydanM);
            if (sydan) { SydanS += dt; sydanLoppuS = 0; } else if ((sydanLoppuS += dt) > SydanLoppuS) SydanS = 0;
            SydanTempo = SydanS > 0 ? 70 + 50 * Math.Max(0, Math.Min(1, (Mittari - TutkiHuippu) / (1 - TutkiHuippu))) : 0;
            if (Mittari >= 1 && voima > 0)
            {
                if (dp <= KiinniM && Profiili.Ottaa && Varoitettu) { Tila = VartijanTila.Kiinni; Vauhti = 0; OteS = 0; return; }
                if (Tila != VartijanTila.Halytys) { Tila = VartijanTila.Halytys; halytysS = 0; huudettu = false; merkki = true; }
            }
            // Kuulo: kuuluva ääni vie tutkimaan (harhautus), ellei hahmo jo näe pelaajaa tai jahtaa.
            if (s.Aanet != null && voima <= 0 && Profiili.Kuulee && Tila != VartijanTila.Halytys)
                foreach (var a in s.Aanet)
                {
                    double dx = a.X - s.VartijaX, dz = a.Z - s.VartijaZ;
                    if (dx * dx + dz * dz <= a.KuuluvuusM * a.KuuluvuusM) { AloitaVaihe(VartijanTila.Etsinta); EpailyX = a.X; EpailyZ = a.Z; katseluS = 0; rauhaS = 0; break; }
                }
            if (voima > 0 && Mittari >= Raja && (Tila == VartijanTila.Partio || Tila == VartijanTila.Paluu || Tila == VartijanTila.Etsii)) AloitaVaihe(VartijanTila.Epaily);
            switch (Tila)
            {
                case VartijanTila.Partio: Partio(dt, s); break;
                case VartijanTila.Epaily:
                    Vauhti = 0; Kaanny(dt, Suunta(EpailyX - s.VartijaX, EpailyZ - s.VartijaZ));
                    if (rauhaS > 0.3 || voima > 0) merkki = true;   // pysähtyi ja kääntyi: selvä ele
                    if (voima <= 0 && rauhaS > EpailyUnohdusS) { if (Mittari > 0.05) AloitaVaihe(VartijanTila.Etsinta); else Rauhoitu(false); katseluS = 0; }
                    break;
                case VartijanTila.Etsinta:
                    merkki = true;
                    if (Profiili.JahtaaMs > 0 && Etaisyys(s.VartijaX, s.VartijaZ, EpailyX, EpailyZ) > PerillaM) { KohdeX = EpailyX; KohdeZ = EpailyZ; Vauhti = KiireMs; }
                    else
                    {
                        Vauhti = 0; katseluS += dt;
                        if (Profiili.JahtaaMs <= 0) Kaanny(dt, Suunta(EpailyX - s.VartijaX, EpailyZ - s.VartijaZ));   // kokki kääntyy ääneen
                        else Yaw = Kulma(Yaw + Math.Sin(katseluS * 1.3) * 70 * dt);   // katselee ympärilleen
                        if (katseluS > EtsintaKatseluS)
                        {
                            if (huippu >= TutkiHuippu && Profiili.JahtaaMs > 0) { AloitaVaihe(VartijanTila.Etsii); ValitseEtsittavat(); }
                            else Rauhoitu(false);
                        }
                    }
                    break;
                case VartijanTila.Etsii:
                    etsiiS += dt;
                    if (etsittavat.Count > 0 && etsiiS < EtsiiS)
                    {
                        var q = etsittavat[0];
                        if (Etaisyys(s.VartijaX, s.VartijaZ, q.X, q.Z) > PerillaM) { KohdeX = q.X; KohdeZ = q.Z; Vauhti = KavelyMs; katseluS = 0; }
                        else { Vauhti = 0; katseluS += dt; Yaw = Kulma(Yaw + Math.Sin(katseluS * 1.7) * 60 * dt); if (katseluS > EtsiiKatseluS) etsittavat.RemoveAt(0); }
                    }
                    else { Vauhti = 0; katseluS += dt; if (etsiiS >= EtsiiS || katseluS > EtsiiKatseluS) Rauhoitu(true); }
                    break;
                case VartijanTila.Halytys:
                    halytysS += dt;
                    if (Profiili.JahtaaMs > 0) { KohdeX = EpailyX; KohdeZ = EpailyZ; Vauhti = Etaisyys(s.VartijaX, s.VartijaZ, EpailyX, EpailyZ) > (dp <= KiinniM ? 0.0 : PerillaM) ? Profiili.JahtaaMs : 0; }
                    else { Vauhti = 0; Kaanny(dt, Suunta(EpailyX - s.VartijaX, EpailyZ - s.VartijaZ)); }
                    if (!huudettu && (eiNaeS > HuutoS || Profiili.JahtaaMs <= 0)) { Huuto = true; huudettu = true; }   // kokki huutaa heti
                    if (halytysS > HalytysS || eiNaeS > HuutoS + 2 && Etaisyys(s.VartijaX, s.VartijaZ, EpailyX, EpailyZ) <= PerillaM)
                    { if (Profiili.JahtaaMs > 0) { AloitaVaihe(VartijanTila.Etsii); ValitseEtsittavat(); } else Rauhoitu(true); }
                    break;
                case VartijanTila.Paluu:
                    piste = Lahin(s.VartijaX, s.VartijaZ);
                    Tila = VartijanTila.Partio; odotus = 0;
                    Partio(dt, s);
                    break;
            }
            // Torkkuja palaa paikalleen ja nukahtaa uudelleen (ei valppaana).
            if (Profiili == VartijaProfiili.Torkku && Tila == VartijanTila.Partio && Valppaus <= 0 && reitti.Count > 0
                && Etaisyys(s.VartijaX, s.VartijaZ, reitti[0].X, reitti[0].Z) <= PerillaM)
            {
                Torkkuu = true; Mittari = 0;
            }
        }

        /// <summary>Hälytyksen leviäminen (kohta 3.5): toisen hahmon huuto kutsuu tutkimaan paikkaa (ei jo jahtaavaa, ei kuuroa).</summary>
        public void Kutsu(double x, double z)
        {
            if (!Profiili.Kuulee || Profiili.JahtaaMs <= 0 || Tila == VartijanTila.Halytys || Tila == VartijanTila.Kiinni) return;
            AloitaVaihe(VartijanTila.Etsinta); EpailyX = x; EpailyZ = z; rauhaS = 0;
        }

        void AloitaVaihe(VartijanTila t)
        {
            if (Tila == VartijanTila.Partio || Tila == VartijanTila.Paluu) { varoitusS = 0; huippu = Mittari; merkki = false; }
            Tila = t; katseluS = 0;
            if (t == VartijanTila.Etsii) etsiiS = 0;
        }

        /// <summary>Vaiheen loppu: paluu partioon (Paluu → lähin partiopiste); vaiheiden 3–4 jälkeen valppaus 60 s.</summary>
        void Rauhoitu(bool valppaaksi)
        {
            Tila = VartijanTila.Paluu;
            if (valppaaksi) Valppaus = ValppausS;
        }

        void ValitseEtsittavat()
        {
            etsittavat.Clear();
            var l = new List<(double X, double Z, double D)>();
            foreach (var p in Piilot) { double d = Etaisyys(EpailyX, EpailyZ, p.X, p.Z); if (d <= EtsiiM) l.Add((p.X, p.Z, d)); }
            l.Sort((a, b) => a.D.CompareTo(b.D));
            for (int i = 0; i < l.Count && i < 2; i++) etsittavat.Add((l[i].X, l[i].Z));
            if (etsittavat.Count == 0) etsittavat.Add((EpailyX, EpailyZ));
        }

        void Partio(double dt, in VartijanSyote s)
        {
            if (reitti.Count == 0) { Vauhti = 0; return; }
            var p = reitti[piste];
            KohdeX = p.X; KohdeZ = p.Z;
            if (Etaisyys(s.VartijaX, s.VartijaZ, p.X, p.Z) > PerillaM) { Vauhti = KavelyMs; odotus = 0; return; }
            Vauhti = 0; odotus += dt;
            if (odotus >= Math.Max(0, p.OdotaS - (Valppaus > 0 ? 1 : 0))) { piste = (piste + 1) % reitti.Count; odotus = 0; var q = reitti[piste]; KohdeX = q.X; KohdeZ = q.Z; Vauhti = KavelyMs; }
        }

        void Kaanny(double dt, double tavoite)
        {
            double ero = Kulma(tavoite - Yaw), askel = KaantoAsteS * dt;
            Yaw = Kulma(Yaw + Math.Max(-askel, Math.Min(askel, ero)));
        }

        int Lahin(double x, double z)
        {
            int paras = 0; double pd = double.MaxValue;
            for (int i = 0; i < reitti.Count; i++) { double d = Etaisyys(x, z, reitti[i].X, reitti[i].Z); if (d < pd) { pd = d; paras = i; } }
            return paras;
        }

        static double Etaisyys(double ax, double az, double bx, double bz) { double dx = bx - ax, dz = bz - az; return Math.Sqrt(dx * dx + dz * dz); }

        /// <summary>Tarkistuspisteen jälkeen: vartija takaisin partioon, mittari nollaan.</summary>
        public void Nollaa(double x, double z, bool valpas = false)
        {
            Tila = VartijanTila.Partio; Mittari = 0; piste = Lahin(x, z); odotus = 0; rauhaS = 0;
            varoitusS = 0; merkki = false; SydanS = 0; SydanTempo = 0; Huuto = false; huudettu = false; etsittavat.Clear();
            Valppaus = valpas ? ValppausS : 0; tunnistusS = 0;
        }
    }
}
