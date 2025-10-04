'use client';

import { Button } from '@/common/components/ui/button';
import { Input } from '@/common/components/ui/input';
import { Label } from '@/common/components/ui/label';
import { Textarea } from '@/common/components/ui/textarea';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type React from 'react';
import { useState } from 'react';

import type { FormField } from '../../data/nextStep';

interface RegisterFormProps {
  title: string;
  subtitle: string;
  fields: FormField[];
  submitText: string;
  disclaimer: string;
}

export function RegisterForm({ title, subtitle, fields, submitText, disclaimer }: RegisterFormProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className='bg-card border border-border rounded-2xl p-8 shadow-lg'>
      <h3 className='text-2xl font-bold text-foreground mb-2'>{title}</h3>
      <p className='text-muted-foreground mb-6'>{subtitle}</p>

      <form onSubmit={handleSubmit} className='space-y-5'>
        {fields.map((field) => (
          <div key={field.id}>
            <Label htmlFor={field.id}>
              {field.label} {field.required && '*'}
            </Label>
            {field.type === 'textarea' ? (
              <Textarea
                id={field.id}
                placeholder={field.placeholder}
                value={formData[field.id] || ''}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleChange(field.id, e.target.value)}
                required={field.required}
                rows={field.rows}
                className='mt-1.5'
              />
            ) : (
              <Input
                id={field.id}
                type={field.type}
                placeholder={field.placeholder}
                value={formData[field.id] || ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(field.id, e.target.value)}
                required={field.required}
                className='mt-1.5'
              />
            )}
          </div>
        ))}

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            type='submit'
            size='lg'
            className='w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground group relative overflow-hidden shadow-lg hover:shadow-secondary/50 transition-shadow'
          >
            <motion.span
              className='absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent'
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.6 }}
            />
            <span className='relative z-10 flex items-center justify-center'>
              {submitText}
              <ArrowRight className='ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform' />
            </span>
          </Button>
        </motion.div>

        <p className='text-xs text-muted-foreground text-center'>{disclaimer}</p>
      </form>
    </div>
  );
}
