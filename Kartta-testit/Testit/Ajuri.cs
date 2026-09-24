// Testiajuri ilman NUnitia (sama kuin Peli-testit/Testit/Ajuri.cs ilman pelin sopimustestejä):
// ./kaanna.sh [nimen osa] ajaa kaikki [Testi]-metodit (static void) ja palauttaa virheiden määrän.
using System;
using System.Linq;
using System.Reflection;

namespace Matkakirja.Kartta.Testit
{
    [AttributeUsage(AttributeTargets.Method)]
    public sealed class TestiAttribute : Attribute { }

    public static class Oleta
    {
        public static void Tosi(bool ehto, string viesti = "") { if (!ehto) throw new Exception("ei tosi: " + viesti); }
        public static void Sama<T>(T odotettu, T saatu, string viesti = "")
        {
            if (!Equals(odotettu, saatu)) throw new Exception($"odotettu {odotettu}, saatu {saatu} {viesti}");
        }
    }

    public static class Ajuri
    {
        public static int Main(string[] args)
        {
            var suodin = args.Length > 0 ? args[0] : "";
            var testit = typeof(Ajuri).Assembly.GetTypes()
                .SelectMany(t => t.GetMethods(BindingFlags.Public | BindingFlags.NonPublic | BindingFlags.Static))
                .Where(m => m.GetCustomAttribute<TestiAttribute>() != null)
                .Where(m => (m.DeclaringType.Name + "." + m.Name).Contains(suodin))
                .OrderBy(m => m.DeclaringType.Name + "." + m.Name).ToList();
            int ok = 0, vika = 0;
            foreach (var m in testit)
            {
                var nimi = m.DeclaringType.Name + "." + m.Name;
                try { m.Invoke(null, null); ok++; Console.WriteLine("OK    " + nimi); }
                catch (TargetInvocationException e) { vika++; Console.WriteLine("FAIL  " + nimi + " — " + e.InnerException?.Message); }
            }
            Console.WriteLine($"\n{ok}/{ok + vika} läpi");
            return vika;
        }
    }
}
