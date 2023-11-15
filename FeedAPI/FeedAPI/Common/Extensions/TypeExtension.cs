using Common.EntityFramework.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Common.Extensions
{
    public static class TypeExtension
    {
        public static object CompareAndChangeType(object changes, object target)
        {
            PropertyInfo[] ChangesProps = changes.GetType().GetProperties();
            PropertyInfo[] TargetProps = target.GetType().GetProperties();

            foreach (PropertyInfo changeProp in ChangesProps)
            {
                foreach (PropertyInfo targetProp in TargetProps)
                {
                    if (changeProp.Name == targetProp.Name)
                    {
                        var value = changeProp?.GetValue(changes);
                        var targetValue = targetProp?.GetValue(target);
                        if (value?.ToString() != targetValue?.ToString() && value != null)
                        {
                            targetProp.SetValue(target, value);
                        }
                    }
                }
            }

            return target;
        }
    }
}
