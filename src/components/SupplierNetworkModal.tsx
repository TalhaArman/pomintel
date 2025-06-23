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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.phone || !formData.email || !formData.country || !formData.type) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in all required fields marked with *",
        variant: "destructive"
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return;
    }

    // Send data to Web3Forms
    const payload = {
      access_key: "c74cd7ff-2723-44af-b9e6-fcd79504b4b4",
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      country: formData.country,
      companyName: formData.companyName,
      companyWebsite: formData.companyWebsite,
      type: formData.type,
      monthlyVolume: formData.monthlyVolume,
      pricePerKG: formData.pricePerKG
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (result.success) {
        toast({
          title: "Application Submitted!",
          description: "Thank you for joining the Pomintel Supplier Network. We'll be in touch soon.",
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
          pricePerKG: ''
        });
        onClose();
      } else {
        toast({
          title: "Submission Failed",
          description: result.message || "There was an error submitting your application. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
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
              className="mt-1"
              required
            />
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
              className="mt-1"
              required
            />
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
              className="mt-1"
              required
            />
          </div>

          <div>
            <Label htmlFor="country" className="text-sm font-medium text-foreground">
              Country <span className="text-red-500">*</span>
            </Label>
            <Input
              id="country"
              value={formData.country}
              onChange={(e) => handleInputChange('country', e.target.value)}
              className="mt-1"
              required
            />
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
              <SelectTrigger className="mt-1">
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

          <Button type="submit" className="w-full bg-black text-white hover:bg-black/90 mt-6">
            Submit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SupplierNetworkModal;