import React, { useState, useRef } from 'react';
import { 
  ImprovedDialog as Dialog, 
  ImprovedDialogContent as DialogContent, 
  ImprovedDialogHeader as DialogHeader, 
  ImprovedDialogTitle as DialogTitle,
  ImprovedDialogDescription as DialogDescription,
  ImprovedDialogBody as DialogBody,
  ImprovedDialogFooter as DialogFooter 
} from '../ui/improved-dialog';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Upload, Video, Play, Pause, X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface CreateClipModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateClipModal({ isOpen, onClose }: CreateClipModalProps) {
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const [sound, setSound] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('video/')) {
      setSelectedVideo(file);
      const url = URL.createObjectURL(file);
      setVideoPreview(url);
    }
  };

  const handleVideoUpload = () => {
    fileInputRef.current?.click();
  };

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.log('Video play failed:', err);
      });
    }
  };

  const handleSubmit = async () => {
    if (!selectedVideo || !caption.trim()) return;

    setIsUploading(true);
    
    // Simulate upload process
    setTimeout(() => {
      console.log('Clip uploaded:', {
        video: selectedVideo.name,
        caption,
        sound: sound || 'Original Audio'
      });
      
      setIsUploading(false);
      handleClose();
    }, 2000);
  };

  const handleClose = () => {
    setSelectedVideo(null);
    setVideoPreview(null);
    setCaption('');
    setSound('');
    setIsPlaying(false);
    setIsUploading(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent size="large">
        <DialogHeader>
          <DialogTitle>Create Clip</DialogTitle>
          <DialogDescription>
            Share a short video with your followers
          </DialogDescription>
        </DialogHeader>

        <DialogBody className="space-y-6">
          {/* Video Upload */}
          {!selectedVideo ? (
            <div className="border-2 border-dashed border-border/60 rounded-xl p-8 text-center bg-muted/30">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Video className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Upload your video</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Choose a video file (MP4, MOV, AVI) - Gaming clips work best!
              </p>
              <Button 
                onClick={handleVideoUpload}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Upload className="w-4 h-4 mr-2" />
                Select Video
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                onChange={handleVideoSelect}
                className="hidden"
              />
            </div>
          ) : (
            <div className="space-y-4">
              {/* Video Preview */}
              <div className="relative bg-black rounded-xl overflow-hidden aspect-[9/16] max-h-80 mx-auto border border-border/40">
                <video
                  ref={videoRef}
                  src={videoPreview || ''}
                  className="w-full h-full object-cover"
                  loop
                  muted
                  playsInline
                  onClick={togglePlayPause}
                  onEnded={() => setIsPlaying(false)}
                />
                
                {/* Play/Pause Overlay */}
                {!isPlaying && (
                  <div 
                    className="absolute inset-0 flex items-center justify-center bg-black/20 cursor-pointer"
                    onClick={togglePlayPause}
                  >
                    <div className="bg-black/60 rounded-full p-4 backdrop-blur-sm border border-white/10 shadow-2xl">
                      <Play className="w-8 h-8 text-white fill-white drop-shadow-lg" />
                    </div>
                  </div>
                )}

                {/* Bottom Gradient */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent h-24 pointer-events-none" />

                {/* Mock User Info Overlay */}
                <div className="absolute bottom-3 left-3 flex items-center gap-2 text-white">
                  <Avatar className="w-7 h-7">
                    <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face" />
                    <AvatarFallback>You</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-bold drop-shadow-lg">Your username</span>
                </div>
              </div>

              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleVideoUpload}
                className="w-full"
              >
                Choose Different Video
              </Button>
            </div>
          )}

          {/* Caption Input */}
          <div className="space-y-2">
            <Label htmlFor="caption">Caption</Label>
            <Textarea
              id="caption"
              placeholder="Write a caption... Use hashtags to reach more people! #gaming #epic"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="min-h-[100px] resize-none"
              maxLength={500}
            />
            <div className="text-xs text-muted-foreground text-right">
              {caption.length}/500
            </div>
          </div>

          {/* Sound Input */}
          <div className="space-y-2">
            <Label htmlFor="sound">Sound (Optional)</Label>
            <Input
              id="sound"
              placeholder="Add music or sound name... e.g., 'Epic Gaming Music'"
              value={sound}
              onChange={(e) => setSound(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Leave empty to use original audio from your video
            </p>
          </div>

        </DialogBody>

        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={handleClose}
            disabled={isUploading}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!selectedVideo || !caption.trim() || isUploading}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {isUploading ? (
              <>
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                Uploading...
              </>
            ) : (
              'Share Clip'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}