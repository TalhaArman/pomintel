import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SupplierNetworkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SupplierNetworkModal = ({ isOpen, onClose }: SupplierNetworkModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    country: '',
    companyName: '',
    companyWebsite: '',
    type: '',
    monthlyVolume: '',
    pricePerKG: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (field: string, value: string) => {
    let error = '';
    if (["name", "phone", "email", "country", "type"].includes(field) && !value) {
      error = 'Required';
    }
    if (field === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        error = 'Invalid email';
      }
    }
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    validateField(field, value);
  };

  const validateForm = () => {
    const newErrors: any = {};
    ["name", "phone", "email", "country", "type"].forEach(field => {
      if (!formData[field]) newErrors[field] = 'Required';
    });
    if (formData.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Invalid email';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast({
        title: "Missing or Invalid Fields",
        description: "Please correct the highlighted fields.",
        variant: "destructive"
      });
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbw585g5Ft1ziY2GFW_-Zzkz5msw3-NWu-n5VsF9qNSdkJqJ9dg7MO4ij-D02gVpaP_j/exec', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'early-access',
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          country: formData.country,
          companyName: formData.companyName,
          companyWebsite: formData.companyWebsite,
          type: formData.type,
          monthlyVolume: formData.monthlyVolume,
          pricePerKg: formData.pricePerKG,
        }),
      });
      if (response.ok) {
        toast({
          title: "Submitted!",
          description: "Your information has been sent. We'll be in touch soon.",
          variant: "default"
        });
        setFormData({
          name: '',
          phone: '',
          email: '',
          country: '',
          companyName: '',
          companyWebsite: '',
          type: '',
          monthlyVolume: '',
          pricePerKG: '',
        });
        setErrors({});
        onClose();
      } else {
        toast({
          title: "Submission Failed",
          description: "There was a problem sending your data. Please try again later.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Submission Error",
        description: "There was a problem sending your data. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto max-h-[90vh] overflow-y-auto bg-background border border-border">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-lg font-semibold text-foreground">
            Join the Pomintel Supplier Network
          </DialogTitle>
        </DialogHeader>
        
        <div className="text-sm text-muted-foreground mb-6">
          We're building a private directory of farmers, suppliers, exporters, importers, and buyers in the pomegranate trade. If you're active in this space, enter your info below to join our network.
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-sm font-medium text-foreground">
              Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              onBlur={(e) => validateField('name', e.target.value)}
              className={`mt-1 ${errors['name'] ? 'border-red-500' : ''}`}
              required
            />
            {errors['name'] && <div className="text-xs text-red-500 mt-1">{errors['name']}</div>}
          </div>

          <div>
            <Label htmlFor="phone" className="text-sm font-medium text-foreground">
              Phone Number / WhatsApp <span className="text-red-500">*</span>
            </Label>
            <Input
              id="phone"
              placeholder="Ex: +1-804-440-4440"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              onBlur={(e) => validateField('phone', e.target.value)}
              className={`mt-1 ${errors['phone'] ? 'border-red-500' : ''}`}
              required
            />
            {errors['phone'] && <div className="text-xs text-red-500 mt-1">{errors['phone']}</div>}
          </div>

          <div>
            <Label htmlFor="email" className="text-sm font-medium text-foreground">
              Email <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              onBlur={(e) => validateField('email', e.target.value)}
              className={`mt-1 ${errors['email'] ? 'border-red-500' : ''}`}
              required
            />
            {errors['email'] && <div className="text-xs text-red-500 mt-1">{errors['email']}</div>}
          </div>

          <div>
            <Label htmlFor="country" className="text-sm font-medium text-foreground">
              Country <span className="text-red-500">*</span>
            </Label>
            <Input
              id="country"
              value={formData.country}
              onChange={(e) => handleInputChange('country', e.target.value)}
              onBlur={(e) => validateField('country', e.target.value)}
              className={`mt-1 ${errors['country'] ? 'border-red-500' : ''}`}
              required
            />
            {errors['country'] && <div className="text-xs text-red-500 mt-1">{errors['country']}</div>}
          </div>

          <div>
            <Label htmlFor="companyName" className="text-sm font-medium text-foreground">
              Company Name
            </Label>
            <Input
              id="companyName"
              value={formData.companyName}
              onChange={(e) => handleInputChange('companyName', e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="companyWebsite" className="text-sm font-medium text-foreground">
              Company Website
            </Label>
            <Input
              id="companyWebsite"
              value={formData.companyWebsite}
              onChange={(e) => handleInputChange('companyWebsite', e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="type" className="text-sm font-medium text-foreground">
              Type <span className="text-red-500">*</span>
            </Label>
            <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
              <SelectTrigger className={`mt-1 ${errors['type'] ? 'border-red-500' : ''}`}>
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent className="bg-background border border-border shadow-lg z-50">
                <SelectItem value="farmer">Farmer</SelectItem>
                <SelectItem value="supplier">Supplier</SelectItem>
                <SelectItem value="exporter">Exporter</SelectItem>
                <SelectItem value="importer">Importer</SelectItem>
                <SelectItem value="buyer">Buyer</SelectItem>
                <SelectItem value="trader">Trader</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            {errors['type'] && <div className="text-xs text-red-500 mt-1">{errors['type']}</div>}
          </div>

          <div>
            <Label htmlFor="monthlyVolume" className="text-sm font-medium text-foreground">
              What is your monthly volume availability of pomegranate? (in Kg)
            </Label>
            <Input
              id="monthlyVolume"
              value={formData.monthlyVolume}
              onChange={(e) => handleInputChange('monthlyVolume', e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="pricePerKG" className="text-sm font-medium text-foreground">
              Price in USD per KG
            </Label>
            <Input
              id="pricePerKG"
              value={formData.pricePerKG}
              onChange={(e) => handleInputChange('pricePerKG', e.target.value)}
              className="mt-1"
            />
          </div>

          <Button type="submit" className="w-full bg-black text-white hover:bg-black/90 mt-6" disabled={isSubmitting}>
            Submit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SupplierNetworkModal;